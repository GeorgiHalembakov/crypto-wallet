import React from "react";
import styled from "styled-components";

const Header = () => {
  const StyledHeader = styled.section`
    max-width: 100%;
    background-color: #4c2c92;
    color: #fff;
    font-size: 1.3em;
    font-family: Arial;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7em;
  `;

  return <StyledHeader>Crypto Wallet App</StyledHeader>;
};

export default Header;
