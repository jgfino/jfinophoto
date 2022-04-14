import { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import { IoShuffle as Shuffle } from "react-icons/io5";
import { ConcertImage } from "../types";
import LoadingPage from "../components/LoadingPage";
import { getPortolio } from "../apiClient";
import ErrorPage from "../components/ErrorPage";
import MasonryLightbox from "../components/MasonryLightbox";
import FooterBar from "../components/FooterBar";

const Photos = () => {
  const [images, setImages] = useState<ConcertImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onShuffle = () => {
    setImages(images.sort(() => 0.5 - Math.random()).slice());
  };

  useEffect(() => {
    getPortolio()
      .then((data) => {
        setImages(data.sort(() => 0.5 - Math.random()));
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <Container>
      <HeaderBar activePath="portfolio" />
      <RefreshContainer>
        <RefreshButton onClick={onShuffle}>
          <Shuffle size={"2em"} />
        </RefreshButton>
      </RefreshContainer>
      <MasonryLightbox
        columnsCountBreakPoints={{
          250: 2,
          500: 3,
          1000: 4,
          1200: 5,
          1500: 6,
          1600: 7,
        }}
        spacing="1em"
        images={images.map((image) => image.url)}
        titles={images.map((image) => image.artist)}
        captions={images.map((image) => `${image.venue} | ${image.date}`)}
      />
      <FooterBar />
    </Container>
  );
};

export default Photos;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const RefreshContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RefreshButton = styled.button`
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.text};
  border: none;
  width: 10em;
  cursor: pointer;
  border-radius: 1em;
  align-self: center;
  padding: 0.5em;
`;
