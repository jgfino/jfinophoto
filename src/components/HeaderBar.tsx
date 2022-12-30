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
import { isMobile } from "react-device-detect";
import { IconType } from "react-icons";

interface HeaderProps {
  activePath: "live" | "galleries" | "about" | "contact";
}

const HeaderBar: React.FC<HeaderProps> = ({ activePath }) => {
  const theme = useTheme();
  const paths = ["live", "galleries", "about", "contact"];
  const [small, setSmall] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 890) {
        setSmall(true);
      } else {
        setSmall(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "48px",
      height: "32px",
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

  const renderSocial = (link: string, large: boolean, Component: IconType) => (
    <SocialButton target="_blank" href={link}>
      <Component size={large ? "4rem" : "1.8rem"} />
    </SocialButton>
  );

  const renderSocials = (large = false) => (
    <>
      {renderSocial(
        "https://www.instagram.com/jfino.photo/",
        large,
        LogoInstagram
      )}
      {large && <br />}
      {large && <br />}
      {renderSocial("https://twitter.com/jfinophoto", large, Twitter)}
      {large && <br />}
      {large && <br />}
      {renderSocial("mailto:julia@jfinophoto.com", large, Mail)}
      {large && <br />}
      {large && <br />}
      {renderSocial("https://github.com/jgfino", large, LogoGitHub)}
    </>
  );

  return isMobile || small ? (
    <Menu width="50%" styles={styles}>
      <SideTitle to="/">JULIA FINOCCHIARO</SideTitle>
      <br />
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
      <br />
      {renderSocials(true)}
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
  font-size: 3.5em;
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
  font-size: 3em;
  margin-bottom: 1rem;
`;
