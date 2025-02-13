"use client";

// Next and React
import React, { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";

// External libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import TextInput from "@/components/form-components/TextInput";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import AlreadyHaveAccount from "@/features/auth/components/buttons/AlreadyHaveAccount";
import EmailVerification from "@/features/auth/components/email-verification/EmailVerification";
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";
import PasswordInput from "@/components/form-components/PasswordInput";
import PrimaryAuthContainer from "@/features/auth/components/containers/PrimaryAuthContainer";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";

// Schema
import { signUpSchema } from "@/features/auth/schemas/formSchemas";

// Server actions
import { signUp} from "@/app/actions/actions";
import { State } from "@/types/serverActionState";

//Hooks
import { useHandleActionState } from "@/features/auth/hooks/useHandleActionState";
import { SignUpInputs } from "@/features/auth/schemas/formSchemas";

/**
 * Sign up form
 *
 * @returns JSX.Element
 */
export default function Signup() {
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState<State, FormData>(signUp, null);
  const [email, setEmail] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [userSuccess, setUserSuccess] = useState<boolean>(false);

  const onSuccessFn = () => {
    setUserSuccess(true);
    setEmail(state?.status === "success" && state.user ? state.user.email : null);
  };

  const { err } = useHandleActionState(
    state,
    setError,
    onSuccessFn,
    "Signed up successfully!"
  );

  return (
    <PrimaryAuthContainer>
      {/* Sign Up form*/}
      {!userSuccess && (
        <form action={formAction} className="flex flex-col gap-2 w-[1/3]">
          <PrimaryAuthHeader label="Create Account" />
          <div className="flex flex-col  mb-2">
            <TextInput
              type="email"
              id="email1"
              fieldName="email"
              placeholder="Email"
              errors={errors}
              register={register}
            />
            <PasswordInput
              fieldName="password"
              errors={errors}
              register={register}
              withPasswordTooltip={true}
            />
          </div>
          <PrimarySubmitButton
            bgColor="bg-primary-700"
            textColor="text-white"
            hoverBgColor="hover:bg-primary-900"
            text="Create Account"
          />
          {pending && <span>Loading...</span>}
        </form>
      )}

      {/* Email verification */}
      {userSuccess && (
        <EmailVerification email={email ? email : "your email"} />
      )}

      {/* Already have and account? */}
      {!userSuccess && <AlreadyHaveAccount />}

      {/* OR section */}
      {!userSuccess && <OrDivider />}
      {err && <PrimaryErrorMessage errMsg={err} />}

      {/* Sign up with google button */}
      {!userSuccess && <GoogleButton label="Continue with Google" />}
    </PrimaryAuthContainer>
  );
}
