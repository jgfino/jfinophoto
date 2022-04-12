import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  IoLogoInstagram as LogoInstagram,
  IoLogoGithub as LogoGitHub,
  IoMailOpenOutline as Mail,
} from "react-icons/io5";

const HeaderBar = ({ activePath }: { activePath: string }) => {
  const paths = ["portfolio", "concerts", "about", "contact"];
  return (
    <Container>
      <Title to="/portfolio">JULIA FINOCCHIARO</Title>
      <NavBar>
        {paths.map((path) => (
          <NavButton
            style={
              activePath == path ? { textDecoration: "underline" } : undefined
            }
            to={`/${path}`}
          >
            {path.toUpperCase()}
          </NavButton>
        ))}

        <SocialButton
          target="_blank"
          href="https://www.instagram.com/jfino.photo/"
        >
          <LogoInstagram size={"1.8rem"} />
        </SocialButton>
        <SocialButton target="_blank" href="mailto:julia@jfinophoto.com">
          <Mail size={"1.8rem"} />
        </SocialButton>
        <SocialButton target="_blank" href="https://github.com/jgfino">
          <LogoGitHub size={"1.8rem"} />
        </SocialButton>
      </NavBar>
    </Container>
  );
};

export default HeaderBar;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 1.5em;
  background-color: ${({ theme }) => theme.colors.background};
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
`;

const NavButton = styled(NavLink)`
  font-size: 1.4em;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  text-underline-offset: 0.2em;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  margin-left: 1rem;
  padding-bottom: 0.3rem;
`;

const SocialButton = styled.a`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 1rem;
`;

const Title = styled(NavLink)`
  font-size: 2em;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: bold;
  text-decoration: none;
`;
