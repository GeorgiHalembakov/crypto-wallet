import React from "react";
import styled from "styled-components";

const Card = ({ children }) => {
  const StyledContainer = styled.div`
    font-size: 1em;
    font-family: Arial;
    width: fit-content;
    max-width: 100%;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
  `;

  return <StyledContainer>{children}</StyledContainer>;
};

export default Card;
