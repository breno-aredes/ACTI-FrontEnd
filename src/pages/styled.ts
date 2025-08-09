import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: "Quicksand", "Nunito", "Segoe UI", "Arial Rounded MT Bold", Arial,
    sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 1000px;
  max-width: 1200px;
  padding: 30px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
    width: calc(100% - 20px);
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 600;
`;

export const Subtitle = styled.h2`
  color: #34495e;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 500;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const Column = styled.div<{ width?: string }>`
  flex: ${(props) => props.width || "1"};
  min-width: 200px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ecf0f1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
  margin: 20px 0;
  display: flex;
  align-items: center;
  font-weight: 500;

  &::before {
    content: "✓";
    margin-right: 10px;
    font-weight: bold;
    font-size: 18px;
  }
`;

export const ErrorCard = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  margin: 20px 0;
  display: flex;
  align-items: center;
  font-weight: 500;

  &::before {
    content: "⚠";
    margin-right: 10px;
    font-weight: bold;
    font-size: 18px;
  }
`;

export const InfoCard = styled.div`
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #bee5eb;
  margin: 20px 0;
  display: flex;
  align-items: center;
  font-weight: 500;

  &::before {
    content: "ℹ";
    margin-right: 10px;
    font-weight: bold;
    font-size: 18px;
  }
`;
