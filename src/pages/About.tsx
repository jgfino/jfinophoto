import React from "react";
import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";

const About = () => {
  return (
    <Container>
      <HeaderBar activePath="about" />
    </Container>
  );
};

export default About;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`;
