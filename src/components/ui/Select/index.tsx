import { forwardRef } from "react";
import type { Props as ReactSelectProps } from "react-select";
import { StyledSelect, SelectLabel, ErrorMessage } from "./styled";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<ReactSelectProps, "options"> {
  label?: string;
  required?: boolean;
  error?: string;
  $hasError?: boolean;
  options: SelectOption[];
}

export const Select = forwardRef<any, SelectProps>(
  ({ label, required, error, $hasError, options, ...props }, ref) => {
    return (
      <div>
        {label && (
          <SelectLabel className={required ? "required" : ""}>
            {label}
          </SelectLabel>
        )}
        <StyledSelect
          ref={ref}
          options={options}
          $hasError={$hasError || !!error}
          classNamePrefix="react-select"
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

Select.displayName = "Select";
