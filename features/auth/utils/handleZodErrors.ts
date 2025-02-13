import { setErrors } from "@/utils/form-helpers/setErrors";
import { UseFormSetError, FieldValues} from "react-hook-form";
import { State } from "@/types/serverActionState";

export const handleZodErrors = <TFieldValues extends FieldValues>(
  state: State,
  setError: UseFormSetError<TFieldValues>
) => {
  if (state?.status === "error" && Array.isArray(state?.errors)) {
    setErrors(state.errors, setError);
  }
};
