"use client";
import React, { useActionState} from "react";

//External libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Next
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import OrDivider from "@/components/form-components/OrDivider";
import ForgotPassword from "@/features/auth/components/buttons/ForgotPasswordButton";
import GoogleButton from "@/features/auth/components/buttons/GoogleButton";
import PasswordInput from "@/components/form-components/PasswordInput";
import TextInput from "@/components/form-components/TextInput";
import PrimaryAuthContainer from "@/features/auth/components/containers/PrimaryAuthContainer";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";

//Schema
import {
  signInSchema,
  SignInInputs,
} from "@/features/auth/schemas/formSchemas";

// Server actions
import { login} from "@/app/actions/actions";
import { State } from "@/types/serverActionState";

//Hooks
import { useHandleActionState } from "@/features/auth/hooks/useHandleActionState";

const SignInForm = () => {
  
  const {
    register,
    formState: { errors },
    setError,
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSuccessFn = () => {
    router.push("/dashboard");
  };

  const [state, formAction] = useActionState<State, FormData>(login, null);

  const { err } = useHandleActionState(
    state,
    setError,
    onSuccessFn,
    "Signed in successfully!"
  );

  console.log(err);

  return (
    <PrimaryAuthContainer>
      {/*  Sign in form */}
      <form action={formAction} className="flex flex-col gap-2">
        <PrimaryAuthHeader label="Sign in" />
        <div className="flex flex-col mb-2">
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            errors={errors}
            register={register}
            fieldName={"email"}
          />
          <PasswordInput
            id="password2"
            fieldName="password"
            placeholder="Password"
            errors={errors}
            register={register}
          />
        </div>
        <PrimarySubmitButton
          bgColor="bg-primary-700"
          textColor="text-white"
          hoverBgColor="hover:bg-primary-900"
          text="Sign In"
        />
      </form>

      {/* Forgot password */}
      <ForgotPassword />

      {/* Error message */}
      {err && <PrimaryErrorMessage errMsg={err} />}
      <OrDivider />

      {/* Sign Up with google or create account */}
      <GoogleButton label={"Continue with Google"} />

      <Link
        href="/sign-up"
        className="w-full px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] text-sm font-medium text-gray-700 bg-[#e9ecef] shadow-sm hover:bg-[#dee2e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 flex items-center justify-center gap-4 mb-4"
      >
        <span>Create Account</span>
      </Link>
    </PrimaryAuthContainer>
  );
};

export default SignInForm;
