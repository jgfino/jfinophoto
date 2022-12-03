import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  IoLogoInstagram as LogoInstagram,
  IoLogoGithub as LogoGitHub,
  IoMailOpenOutline as Mail,
  IoLogoTwitter as Twitter,
} from "react-icons/io5";
import React from "react";

interface HeaderProps {
  activePath: "portfolio" | "concerts" | "about" | "contact" | "prints";
}

const HeaderBar: React.FC<HeaderProps> = ({ activePath }) => {
  const paths = ["portfolio", "concerts", "about", "prints", "contact"];
  return (
    <Container>
      <Title to="/portfolio">JULIA FINOCCHIARO</Title>
      <NavBar>
        {paths.map((path) => (
          <NavButton
            key={path}
            style={
              activePath === path ? { textDecoration: "underline" } : undefined
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
        <SocialButton target="_blank" href="https://twitter.com/jfinophoto">
          <Twitter size={"1.8rem"} />
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
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 1.5em;
  background-color: ${({ theme }) => theme.colors.background};
  flex-grow: 0;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
`;

const NavButton = styled(NavLink)`
  font-size: 1.4em;
  font-family: ${({ theme }) => theme.fontFamily.main};
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
  font-size: 2.5em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: bold;
  text-decoration: none;
`;
