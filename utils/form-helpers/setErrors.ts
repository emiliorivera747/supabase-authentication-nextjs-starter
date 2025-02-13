import { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const setErrors = <TFieldValues extends FieldValues>(
    errors: { path: string; message: string }[],
    setError: UseFormSetError<TFieldValues>
) => {
    errors?.forEach((error: { path: string; message: string }) => {
        setError(error.path as "root" | `root.${string}` | Path<TFieldValues>, {
            message: error.message,
        });
    });
};
