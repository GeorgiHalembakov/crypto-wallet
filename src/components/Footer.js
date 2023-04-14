import React from "react";
import styled from "styled-components";

const Footer = () => {
  const StyledFooter = styled.section`
    min-height: 400px;
    width: 100%;
    position: relative;
    background-color: #4c2c92;
    margin-top: 8em;
  `;

  const Curve = styled.div`
    position: absolute;
    height: 200px;
    width: 100%:
    bottom: 0;
    :before {
      content: "";
      display: block;
      position: absolute;
      border-radius: 50% 50%;  
      width: 50.1vw;
      height: 100%;
      transform: translate(100%, -45%);
      background-color: #4c2c92;
    };
    :after { 
      content: "";
      display: block;
      position: absolute;
      border-radius: 50% 50%;  
      width: 50.2vw;
      height: 100%;
      transform: translate(0, -50%);
      background-color: #fff;
    }
  `;

  return (
    <StyledFooter>
      <Curve />
    </StyledFooter>
  );
};

export default Footer;
