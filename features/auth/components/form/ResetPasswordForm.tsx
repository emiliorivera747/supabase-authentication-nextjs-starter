"use client";

// React & Next
import React, { useActionState} from "react";
import { useRouter } from "next/navigation";

//External libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import PrimaryErrorMessage from "@/components/errors/PrimaryErrorMessage";
import PasswordInput from "@/components/form-components/PasswordInput";
import PrimaryAuthHeader from "@/features/auth/components/headers/PrimaryAuthHeader";
import PrimaryAuthContainer from "../containers/PrimaryAuthContainer";

//Schema
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "../../schemas/formSchemas";


//Server Actions
import { resetPassword} from "@/app/actions/actions";
import { State } from "@/types/serverActionState";

//Hooks
import { useHandleActionState } from "@/features/auth/hooks/useHandleActionState";

const ResetPasswordForm = ({ code }: { code?: string | null }) => {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();

  const [state, formAction] = useActionState<State, FormData>(
    resetPassword,
    null
  );

  const onSuccessFn = () => {
    router.push("/dashboard");
  };

  const {err} = useHandleActionState(state, setError,onSuccessFn, "Successfully updated password!");

  return (
    <PrimaryAuthContainer>
      <form
        action={formAction}
        className="flex flex-col gap-2"
      >
        <PrimaryAuthHeader label="Reset Your Password" />
        <div className="flex flex-col  mb-2">
          <input type="hidden" name="code" value={code || ""} />
          <PasswordInput
            fieldName="password"
            errors={errors}
            register={register}
            withPasswordTooltip={true}
          />
        </div>
        {err && <PrimaryErrorMessage errMsg={err} />}
        <PrimarySubmitButton text="Reset" />
      </form>
    </PrimaryAuthContainer>
  );
};

export default ResetPasswordForm;
