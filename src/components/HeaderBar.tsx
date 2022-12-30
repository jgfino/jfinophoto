import styled, { css, useTheme } from "styled-components";
import { NavLink } from "react-router-dom";
import {
  IoLogoInstagram as LogoInstagram,
  IoLogoGithub as LogoGitHub,
  IoMailOpenOutline as Mail,
  IoLogoTwitter as Twitter,
} from "react-icons/io5";
import React, { Fragment } from "react";
import { slide as Menu } from "react-burger-menu";

interface HeaderProps {
  activePath: "live" | "galleries" | "about" | "contact";
}

const HeaderBar: React.FC<HeaderProps> = ({ activePath }) => {
  const theme = useTheme();
  const paths = ["live", "galleries", "about", "contact"];
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 890) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "32px",
      top: "36px",
    },
    bmBurgerBars: {
      background: theme.colors.text,
    },
    bmCrossButton: {
      height: "32px",
      width: "32px",
    },
    bmCross: {
      background: theme.colors.text,
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: theme.colors.background,
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmItemList: {
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.4)",
    },
  };

  const renderSocials = () => (
    <>
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
    </>
  );

  return isMobile ? (
    <Menu styles={styles}>
      <SideTitle to="/">JULIA FINOCCHIARO</SideTitle>
      <br />
      {paths.map((path) => (
        <Fragment key={path}>
          <MenuItem
            style={
              activePath === path
                ? { textDecoration: "underline", color: theme.colors.text }
                : undefined
            }
            to={`/${path}`}
          >
            {path.toUpperCase()}
          </MenuItem>
          <br />
        </Fragment>
      ))}
      <br />
      {renderSocials()}
    </Menu>
  ) : (
    <Container>
      <Title to="/">JULIA FINOCCHIARO</Title>
      <NavBar>
        {paths.map((path) => (
          <NavButton
            key={path}
            style={
              activePath === path
                ? { textDecoration: "underline", color: theme.colors.text }
                : undefined
            }
            to={`/${path}`}
          >
            {path.toUpperCase()}
          </NavButton>
        ))}
        {renderSocials()}
      </NavBar>
    </Container>
  );
};

export default HeaderBar;

const MenuCss = css`
  font-size: 2em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-underline-offset: 0.2em;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 5rem;
  padding-right: 5rem;
  background-color: ${({ theme }) => theme.colors.background};
  flex-grow: 0;
  margin-top: 5rem;
`;

const MenuItem = styled(NavLink)`
  ${MenuCss}
  font-size: 1.5em;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
`;

const NavButton = styled(NavLink)`
  ${MenuCss}
  font-size: 1.5em;
  margin-left: 1rem;
`;

const SocialButton = styled.a`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 1rem;
`;

const TitleCss = css`
  font-size: 3em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 500;
  text-decoration: none;
`;

const Title = styled(NavLink)`
  ${TitleCss}
`;

const SideTitle = styled(NavLink)`
  ${TitleCss}
  font-size: 1.7em;
  margin-bottom: 1rem;
`;
