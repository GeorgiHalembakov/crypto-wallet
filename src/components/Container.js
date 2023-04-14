import React from "react";
import styled from "styled-components";

const Container = ({ children }) => {
  const StyledContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 2em 0 ;
    flex-direction: column;
    align-items: center;
  `;

  return <StyledContainer >{children}</StyledContainer>;
};

export default Container;
