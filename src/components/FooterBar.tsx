import styled from "styled-components";
import {
  IoLogoInstagram as LogoInstagram,
  IoLogoGithub as LogoGitHub,
  IoMailOpenOutline as Mail,
} from "react-icons/io5";
import React from "react";

const FooterBar: React.FC = () => {
  return (
    <Container>
      <NavBar>
        <SocialButton
          target="_blank"
          href="https://www.instagram.com/jfino.photo/"
        >
          <LogoInstagram size={"1.5rem"} />
        </SocialButton>
        <SocialButton target="_blank" href="mailto:julia@jfinophoto.com">
          <Mail size={"1.5rem"} />
        </SocialButton>
        <SocialButton target="_blank" href="https://github.com/jgfino">
          <LogoGitHub size={"1.5rem"} />
        </SocialButton>
      </NavBar>
    </Container>
  );
};

export default FooterBar;

const Container = styled.div`
  display: flex;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 1.5em;
  background-color: ${({ theme }) => theme.colors.background};
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
`;

const SocialButton = styled.a`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 1rem;
`;
