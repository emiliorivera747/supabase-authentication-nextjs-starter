import { useEffect, useState } from "react";
import { UseFormSetError, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { State } from "@/types/serverActionState";

// Utility functions
import { getSupabaseErrorMessage } from "@/features/auth/utils/getSupabaseErrorMessages";
import { handleZodErrors } from "@/features/auth/utils/handleZodErrors";

// Define the hook
export function useHandleActionState<TFields extends FieldValues>(
  state: State,
  setError: UseFormSetError<TFields>, // replace `any` with your form type if needed
  onSuccessFn?: () => void, // optional callback for success handling
  successMessage?: string // optional success message
) {
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;

    // Handle Zod validation errors
    handleZodErrors(state, setError);

    if (state.status === "error" && !Array.isArray(state.errors)) {
      if (
        state.errors &&
        typeof state.errors === "object" &&
        "code" in state.errors
      ) {
        setErr(getSupabaseErrorMessage(state.errors.code));
      } else {
        setErr(state.message);
      }
    }

    if (state.status === "success") {
      if (successMessage) toast.success(successMessage, { theme: "colored" });
      if (onSuccessFn) onSuccessFn();
    }
  }, [state, setError]);

  return { err };
}
