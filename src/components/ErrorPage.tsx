import React from "react";
import styled from "styled-components";
import { FiCameraOff as CameraIcon } from "react-icons/fi";

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <StyledIcon />
      <MessageText>
        Uh Oh! We can't find what you're looking for right now. Please try again
        later.
      </MessageText>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const StyledIcon = styled(CameraIcon).attrs((props) => ({
  color: props.theme.colors.text,
  size: "5em",
}))`
  display: flex;
`;

const MessageText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5em;
  font-family: "Barlow Semi Condensed";
  margin: 5rem;
`;
