import React from "react";
import styled from "styled-components";

const Text = ({ secondary, children }) => {
  const StyledText = styled.p`
    color: ${secondary ? "#494949" : "#000"};
    font-size: 1.5rem;
    font-family: Arial ;
    width: 97%;
    word-break: break-all;
    padding: 0 0.5em;
    font-weight: bold;
    border-bottom: 2px solid #4c2c92
  `;

  return <StyledText>{children}</StyledText>;
};

export default Text;
