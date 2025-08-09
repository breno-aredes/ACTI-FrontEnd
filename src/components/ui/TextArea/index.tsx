import { forwardRef } from "react";
import { StyledTextArea, TextAreaLabel, ErrorMessage } from "./styled";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  $hasError?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, error, $hasError, ...props }, ref) => {
    return (
      <div>
        {label && (
          <TextAreaLabel className={required ? "required" : ""}>
            {label}
          </TextAreaLabel>
        )}
        <StyledTextArea ref={ref} $hasError={$hasError || !!error} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
