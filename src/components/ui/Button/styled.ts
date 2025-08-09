import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "small" | "medium" | "large";

const variantStyles = {
  primary: css`
    background-color: #3498db;
    color: white;
    border: 2px solid #3498db;

    &:hover:not(:disabled) {
      background-color: #2980b9;
      border-color: #2980b9;
    }

    &:active:not(:disabled) {
      background-color: #21618c;
      border-color: #21618c;
    }
  `,
  secondary: css`
    background-color: #95a5a6;
    color: white;
    border: 2px solid #95a5a6;

    &:hover:not(:disabled) {
      background-color: #7f8c8d;
      border-color: #7f8c8d;
    }

    &:active:not(:disabled) {
      background-color: #6c7b7d;
      border-color: #6c7b7d;
    }
  `,
  danger: css`
    background-color: #e74c3c;
    color: white;
    border: 2px solid #e74c3c;

    &:hover:not(:disabled) {
      background-color: #c0392b;
      border-color: #c0392b;
    }

    &:active:not(:disabled) {
      background-color: #a93226;
      border-color: #a93226;
    }
  `,
  success: css`
    background-color: #27ae60;
    color: white;
    border: 2px solid #27ae60;

    &:hover:not(:disabled) {
      background-color: #229954;
      border-color: #229954;
    }

    &:active:not(:disabled) {
      background-color: #1e8449;
      border-color: #1e8449;
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: 8px 16px;
    font-size: 12px;
  `,
  medium: css`
    padding: 12px 24px;
    font-size: 14px;
    min-width: 200px;
  `,
  large: css`
    padding: 16px 32px;
    font-size: 16px;
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  user-select: none;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  ${(props) => variantStyles[props.$variant]}
  ${(props) => sizeStyles[props.$size]}

  &:disabled {
    background-color: #bdc3c7;
    border-color: #bdc3c7;
    color: #7f8c8d;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

export const LoadingSpinner = styled.div`
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
