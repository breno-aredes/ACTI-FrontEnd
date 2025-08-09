import styled from "styled-components";

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => (props.$hasError ? "#e74c3c" : "#ddd")};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#e74c3c" : "#3498db")};
  }

  &::placeholder {
    color: #95a5a6;
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #2c3e50;
  font-size: 14px;

  &.required::after {
    content: " *";
    color: #e74c3c;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }
    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`;
