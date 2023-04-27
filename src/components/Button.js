import React from "react";
import styled from "styled-components";

const StyledButton = ({ secondary, onClick, children }) => {
  const Button = styled.button`
    background-color: ${secondary ? "#fff" : "#4c2c92"};
    border: 2px solid #4c2c92;
    border-radius: 6px;
    color: ${secondary ? "#4c2c92" : "#fff"};
    cursor: pointer;
    font-size: 1.3em;
    font-family: Arial;
    padding: 0.4em 0.7em;
    margin-top: 5px;
    max-width: fit-content;
    transition: 0.4s;
    z-index: 1;
    :hover {
      background-color: ${secondary ? "#4c2c92" : "#fff"};
      color: ${secondary ? "#fff" : "#4c2c92"};
    }
  `;

  return <Button onClick={onClick}>{children}</Button>;
};

export default StyledButton;
