import React, { forwardRef } from "react";
import {
  StyledInput,
  InputContainer,
  InputLabel,
  ErrorMessage,
  LoadingIndicator,
} from "./styled";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  isLoading?: boolean;
  $hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, isLoading, $hasError, ...props }, ref) => {
    return (
      <div>
        {label && (
          <InputLabel className={required ? "required" : ""}>
            {label}
          </InputLabel>
        )}
        <InputContainer>
          <StyledInput ref={ref} $hasError={$hasError || !!error} {...props} />
          {isLoading && <LoadingIndicator />}
        </InputContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Input.displayName = "Input";
