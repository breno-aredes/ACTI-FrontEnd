import styled from "styled-components";
import ReactSelect from "react-select";

export const StyledSelect = styled(ReactSelect)<{ $hasError?: boolean }>`
  .react-select__control {
    min-height: 48px;
    border: 2px solid ${(props) => (props.$hasError ? "#e74c3c" : "#ddd")};
    border-radius: 4px;
    box-shadow: none;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: ${(props) => (props.$hasError ? "#e74c3c" : "#bbb")};
    }

    &.react-select__control--is-focused {
      border-color: ${(props) => (props.$hasError ? "#e74c3c" : "#3498db")};
      box-shadow: none;
    }
  }

  .react-select__value-container {
    padding: 2px 12px;
  }

  .react-select__placeholder {
    color: #95a5a6;
    font-size: 14px;
  }

  .react-select__single-value {
    color: #333;
    font-size: 14px;
  }

  .react-select__menu {
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
  }

  .react-select__option {
    padding: 12px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #3498db;
      color: white;
    }

    &.react-select__option--is-selected {
      background-color: #f8f9fa;
      color: #333;
    }

    &.react-select__option--is-focused {
      background-color: #3498db;
      color: white;
    }
  }

  .react-select__indicator-separator {
    background-color: #ddd;
  }

  .react-select__dropdown-indicator {
    color: #666;

    &:hover {
      color: #333;
    }
  }
`;

export const SelectLabel = styled.label`
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
