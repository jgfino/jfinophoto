import React from "react";
import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

const LoadingPage: React.FC = () => {
  return (
    <Container>
      <StyledSpinner />
    </Container>
  );
};

export default LoadingPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledSpinner = styled(BallTriangle).attrs((props) => ({
  color: props.theme.colors.text,
  height: 100,
  width: 100,
}))`
  display: flex;
  flex: 1;
`;
