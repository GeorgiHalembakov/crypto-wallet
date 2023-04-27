import styled, { css, keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 25px 0;
  flex-direction: column;
  align-items: center;
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 0;
  max-height: 70vh;
  overflow-y: auto;
`;

export const ColapsibleContainer = styled.div`
  max-height: 0;
  width: 100%;
  width: 100%;
  max-width: 760px;
  opacity: 0;
  padding: 5px;
  transition: all 1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: none;

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      max-height: 80vh;
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const Card = styled.div`
  font-size: 1em;
  font-family: Arial;
  width: 90%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const WarningMessage = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: space-around;
  color: #4c2c92;
`;

export const ClickableArea = styled.div`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 2px solid #4c2c92;
  width: 100%;
  max-width: 99.4%;
  padding: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const CopyMsg = styled.span`
  margin: -15px 15px;
  font-family: Arial;
  padding: 0;
  position: absolute;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const TextContainer = styled.div`
  background-color: #4c2c92;
  display: flex;
  max-width: 100%;
  width: 100%;
  justify-content: space-between;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 10px;
`;

export const StyledText = styled.p`
  color: #494949;
  text-align: center;
  font-size: 1.2rem;
  font-family: Arial;
  width: 100%;
  margin: 0;
  word-break: break-all;
  ${({ primary }) =>
    primary &&
    css`
      color: #fff;
      font-weight: bold;
      word-break: keep-all;
      `}
      ${({ token }) =>
      token &&
      css`
      font-size: 1rem;
      color: #000;
      font-weight: bold;
    `}
`;

export const TokenCard = styled.div`
  border: 2px solid #4c2c92;
  border-radius: 6px;
  width: 30%;
  min-width: 200px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const spin = keyframes`
from {
  transfrom: rotate(0deg);
}
to { 
  transform: rotate(360deg);
}
`;

export const Loader = styled.div`
  width: 2rem;
  height: 2rem;
  border: 5px solid #f3f3f3;
  border-top: 6px solid #4c2c92;
  border-radius: 100%;
  margin: auto;
  visibility: hidden;
  animation: spin 1s infinite linear;
  visibility: visible;
  animation-name: ${spin};
  animation-iteration-count: infinite;
`;
