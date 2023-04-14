import React from "react";
import styled from "styled-components";

const StyledButton = ({ onClick, children }) => {
  const Button = styled.button`
    background-color: #4c2c92;
    border: 2px solid #4c2c92;
    border-radius: 25px;
    color: #fff;
    cursor: pointer;
    font-size: 1.3em;
    font-family: Arial;
    padding: 0.4em 0.7em;
    margin: 0.5em;
    max-width: fit-content;
    transition: 0.4s;
    :hover {
      background-color: #fff;
      color: #4c2c92;
    }
  `;

  return <Button onClick={onClick}>{children}</Button>;
};

export default StyledButton;
