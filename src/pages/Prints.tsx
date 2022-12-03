import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";

const Prints = () => {
  return (
    <Container>
      <HeaderBar activePath="prints" />
      <InnerContainer>
        <CenterContainer>
          <AboutPanel>
            <AboutText>
              Select limited edition prints are available{" "}
              <AboutLink href="https://jfinophoto.darkroom.com/" target="none">
                HERE
              </AboutLink>
              <br />
              <br />
              If you see a photo you like, but don't see it available, please
              contact me via{" "}
              <AboutLink href="mailto:julia@jfinophoto.com" target="none">
                email
              </AboutLink>{" "}
              or{" "}
              <AboutLink
                href="https://instagram.com/jfino.photo/"
                target="none"
              >
                Instagram
              </AboutLink>{" "}
              and we can try to work out a custom order. Same goes for custom
              sizes.
              <br />
              <br />
              If you have a specific design or lyric art idea in mind, I can try
              to work with you to create a custom piece!
              <br />
              <br />
              <b>ARTISTS: </b>If there are any photos of yours that you do not
              want on my site, please let me know and I will remove them.
            </AboutText>
          </AboutPanel>
        </CenterContainer>
      </InnerContainer>
      <FooterBar />
    </Container>
  );
};

export default Prints;

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
