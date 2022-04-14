import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import julia from "../assets/julia.jpg";
import FooterBar from "../components/FooterBar";

const About = () => {
  return (
    <Container>
      <HeaderBar activePath="about" />
      <InnerContainer>
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
      </InnerContainer>
      <FooterBar />
    </Container>
  );
};

export default About;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const CenterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1400px;
  align-items: center;
  margin: 2em;
`;

const ImageContainer = styled.div`
  flex: 1;
  flex-basis: 400px;
  display: flex;
  justify-content: center;
  aspect-ratio: 2/3;
  max-height: 800px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: scale-down;
`;

const AboutPanel = styled.div`
  flex: 1;
  flex-basis: 500px;
  display: flex;
  justify-content: flex-start;
  margin: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutText = styled.p`
  font-size: 1.7em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2em;
`;

const AboutLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
`;
