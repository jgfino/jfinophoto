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
              <br /> I started shooting concerts in 2021 and have absolutely
              fallen in love with it! I'm currently a contributing photographer
              for{" "}
              <AboutLink href="https://www.tastemakersmag.com/" target="none">
                Tastemakers Magazine
              </AboutLink>
              ,{" "}
              <AboutLink href="https://www.framecodemag.com/" target="none">
                FRAMECODE
              </AboutLink>
              ,and{" "}
              <AboutLink
                href="https://disruptedmag.wixsite.com/online"
                target="none"
              >
                Disrupted Magazine
              </AboutLink>
              , and I've had the opportunity to photograph some amazing artists!
              <br />
              <br />I would love to work together, don't hesitate to{" "}
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
