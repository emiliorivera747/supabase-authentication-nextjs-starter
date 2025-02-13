import React, { useActionState } from "react";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import ErrorForInputs from "@/components/errors/ErrorForInputs";

//External libraries
import { useForm } from "react-hook-form";

//Server Actions
import { resendConfirmation } from "@/app/actions/actions";
import { State } from "@/types/serverActionState";
import { zodResolver } from "@hookform/resolvers/zod";

//Type
import { EmailVerificationInputs, emailVerificationSchema } from "@/features/auth/schemas/formSchemas";

//Hooks
import { useHandleActionState } from "@/features/auth/hooks/useHandleActionState";

const EmailVerification = ({ email }: { email: string }) => {
  const {
    formState: { errors },
    setError,
    register, 
  } = useForm<EmailVerificationInputs>(
    {
      resolver: zodResolver(emailVerificationSchema),
    }
  );

  const [state, formAction] = useActionState<State, FormData>(
    resendConfirmation,
    null
  );
  const onSuccessFn = () => {};
  const { err } = useHandleActionState(
    state,
    setError,
    onSuccessFn,
    "Successfully updated password!"
  );

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-2">
      {err && <PrimaryErrorMessage errMsg={err} />}
      <PrimaryAuthHeader label="Verify your email address" />
        <div className="flex flex-col gap-4 text-center mb-10 mt-6 ">
          <p className="text-[#495057] text-[1rem] tracking-wide leading-6">
        We have sent a verification link to{" "}
        <b className="text-primary-800">{email}</b>. Please check your
        inbox.
          </p>
        </div>
        <input
          type="hidden"
          {...register("email")}
          value={email || ""}
        />
        <PrimarySubmitButton
          bgColor="bg-primary-700"
          textColor="text-white"
          hoverBgColor="hover:bg-primary-900"
          text="Resend Email"
        />
      </form>
      <ErrorForInputs fieldName={"email"} errors={errors} />
    </div>
  );
};

export default EmailVerification;
