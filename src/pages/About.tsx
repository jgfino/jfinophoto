import React from "react";
import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import julia from "../assets/julia.jpg";

const About = () => {
  return (
    <Container>
      <HeaderBar activePath="about" />
      <CenterContainer>
        <ImageContainer>
          <Image src={julia} />
        </ImageContainer>
        <AboutPanel>
          <AboutText>
            Hi! I'm Julia, a photographer based in Boston, MA.
            <br />
            <br /> I started shooting concerts in the fall of 2021 and have
            absolutely fallen in love with it! I'm currently a contributing
            photographer to{" "}
            <AboutLink href="https://www.tastemakersmag.com/" target="none">
              Northeastern University's Tastemakers Magazine
            </AboutLink>
            , and I've had the opportunity to photograph some amazing artists
            including <b>Valley</b>, <b>Maisie Peters</b>, <b>Girl In Red</b>,
            and <b>Tate McRae</b>, as well as several local artists.
            <br />
            <br />
            I'm always looking to discover new music and work with artists, so
            please don't hesitate to{" "}
            <AboutLink href="/contact">reach out!</AboutLink>
          </AboutText>
        </AboutPanel>
      </CenterContainer>
    </Container>
  );
};

export default About;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100%;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 10rem;
  padding-right: 10rem;
  justify-content: space-around;
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Image = styled.img`
  width: 100%;
  object-fit: scale-down;
`;

const AboutPanel = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2em;
  margin-bottom: 2em;
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-left: none;
  flex-direction: column;
  justify-content: center;
`;

const AboutText = styled.p`
  margin: 4em;
  font-size: 1.5em;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2em;
`;

const AboutLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
`;
