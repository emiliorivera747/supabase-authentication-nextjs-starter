"use server";
//Next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//External
import { z } from "zod";

//Utils
import { createClient } from "@/utils/supabase/server";

import { prisma } from "@/lib/prisma";

//Schema
import {
  signUpSchema,
  signInSchema,
  resetPasswordSchema,
  emailVerificationSchema,
} from "@/features/auth/schemas/formSchemas";
import { State } from "@/types/serverActionState";

/**
 * Handles errors thrown by Zod schema validation.
 *
 * @param e - The error object, expected to be of type `unknown`.
 * @returns An object representing the state with error details.
 */
const handleZodError = (e: z.ZodError): State => {
  return {
    status: "error",
    message: "Invalid form data",
    errors: e.issues.map((issue) => ({
      path: issue.path.join("."),
      message: `${issue.message}`,
    })),
  };
};

const handleOtherErrors = (e: unknown): State => {
  return {
    status: "error",
    message: "Something went wrong. Please try again.",
    errors: e instanceof Error && "code" in e ? {code: e.code} : e,
  };
};

const handleSuccess = (formData: FormData): State => {
  return {
    status: "success",
    message: `Welcome, ${formData.get("email")}!`,
    user: { email: formData.get("email") as string },
  };
};

export async function login(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  try {
    
    const supabase = await createClient();

    /**
     * Validate the fields:
     *  - if the fields are invalid, we'll throw a ZodError
     *  - if the fields are valid, we'll return the validated fields
     */
    const validatedFields = signInSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const { error } = await supabase.auth.signInWithPassword(validatedFields);

    if (error?.code === "email_not_confirmed") {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: formData.get("email") as string,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/sign-in`,
        },
      });

      if (error) return handleOtherErrors(error) as State;
    }
    if (error) return handleOtherErrors(error) as State;

    // Add user to the database if they don't exist
    return handleSuccess(formData);
  } catch (e) {
    // In case of a ZodError (caused by our validation) we're adding issues to our response
    if (e instanceof z.ZodError) return handleZodError(e) as State;
    return handleOtherErrors(e) as State;
  }
}

/**
 *
 * @param prevState
 * @param formData
 * @returns
 */
export async function signUp(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  try {
    const supabase = await createClient();

    const validatedFields = signUpSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    const { data, error } = await supabase.auth.signUp(validatedFields);

    if (error) return handleOtherErrors(error) as State;

    // Add the user to your own PostgreSQL database
    await prisma.user.create({
      data: {
        email: validatedFields.email,
        user_id: data.user?.id,
      },
    });

    return handleSuccess(formData);
  } catch (e) {
    // In case of a ZodError (caused by our validation) we're adding issues to our response
    if (e instanceof z.ZodError) return handleZodError(e) as State;
    return handleOtherErrors(e) as State;
  }
}

/**
 *
 * @returns
 */
export async function signOut() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  return redirect("/");
}

/**
 *
 * @param prevState
 * @param formData
 * @returns
 */
export const confirmReset = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const email = formData.get("email") as string;
    const supabase = await createClient();

    emailVerificationSchema.parse({
      email,
    });

    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) return handleOtherErrors(error) as State;

    if (data) {
      const user = data.users.find((user) => user.email === email);
      
      if (!user) {
        return {
          status: "error",
          message: "User not found",
          errors: new Error("user_not_found"),
        };
      }
      if (user.app_metadata.provider !== "email") {
        return {
          status: "error",
          message: "Please sign in with Google or another provider.",
          errors: new Error("User not registered with email."),
        };
      }
    }

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password`,
    });

    return {
      status: "success",
      message: "Password reset email sent successfully.",
      user: { email },
    };
  } catch (e) {
    if (e instanceof z.ZodError) return handleZodError(e) as State;
    return handleOtherErrors(e) as State;
  }
};

/**
 *
 * @param prevState
 * @param formData
 * @returns
 */
export const resetPassword = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const supabase = await createClient();

    const validatedFields = resetPasswordSchema.parse({
      password: formData.get("password") as string,
      code: formData.get("code") as string | null,
      message: formData.get("message") as string | null,
    });

    const { code } = validatedFields;

    if (!code) {
      return {
        status: "error",
        message: "Invalid code",
        errors: [{ path: "code", message: "Invalid code" }],
      };
    }

    const { error } = await supabase.auth.exchangeCodeForSession(
      code ? code : ""
    );

    if (error) return handleOtherErrors(error) as State;

    return {
      status: "success",
      message: "Password reset successfully.",
      user: { email: formData.get("email") as string },
    };
  } catch (e) {
    if (e instanceof z.ZodError) return handleZodError(e) as State;
    return handleOtherErrors(e) as State;
  }
};

export const resendConfirmation = async (
  prevState: State | null,
  formData: FormData
): Promise<State> => {
  try {
    const supabase = await createClient();

    const validatedFields = signUpSchema.parse({
      email: formData.get("email") as string,
    });

    const { email } = validatedFields;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: formData.get("email") as string,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/sign-in`,
      },
    });

    if (error) return handleOtherErrors(error) as State;

    return {
      status: "success",
      message: "Confirmation email sent successfully.",
      user: { email: email },
    };
  } catch (error) {
    if (error instanceof z.ZodError) return handleZodError(error) as State;
    return handleOtherErrors(error) as State;
  }
};
