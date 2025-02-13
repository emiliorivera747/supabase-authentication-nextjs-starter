import { UseFormRegister, Path, FieldValues, FieldErrors} from "react-hook-form";

export interface PasswordInputProps<TFieldValues extends FieldValues> {
  id?: string;
  placeholder?: string;
  fieldName: Path<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  withPasswordTooltip?: boolean;
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
}

export interface TextInputProps<TFieldValues extends FieldValues> {
    type: "email"| "text" | "url" | "search"| "tel" |"number"  ;
    id: string;
    placeholder: string;
    fieldName: Path<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
}

export interface PrimaryInputLabelProps<TFieldValues extends FieldValues> {
  id: string;
  fieldName: string;
  placeholder: string;
  errors: FieldErrors<TFieldValues>;
}

export interface ErrorForInputsProps<TFieldValues extends FieldValues> {
  fieldName: string;
  errors: FieldErrors<TFieldValues>;
}

export interface Input {
  email: string;
  password1: string;
}