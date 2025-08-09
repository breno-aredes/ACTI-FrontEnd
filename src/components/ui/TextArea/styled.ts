import styled from "styled-components";

export const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => (props.$hasError ? "#e74c3c" : "#ddd")};
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
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

export const TextAreaLabel = styled.label`
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
