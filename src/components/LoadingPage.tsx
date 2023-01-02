import React from "react";
import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

interface LoadingPageProps {
  percentage?: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ percentage }) => {
  return (
    <Container percentage={percentage ?? false}>
      <StyledSpinner />
    </Container>
  );
};

export default LoadingPage;

const Container = styled.div<{ percentage: boolean }>`
  width: 100%;
  height: ${(props) => (props.percentage ? "100%" : "100vh")};
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
`;

const StyledSpinner = styled(BallTriangle).attrs((props) => ({
  color: props.theme.colors.text,
  height: 100,
  width: 100,
}))`
  display: flex;
  flex: 1;
`;
