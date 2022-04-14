import { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IoShuffle as Shuffle } from "react-icons/io5";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { ConcertImage } from "../types";
import LoadingPage from "../components/LoadingPage";
import { getPortolio } from "../apiClient";
import ErrorPage from "../components/ErrorPage";

const Photos = () => {
  const [images, setImages] = useState<ConcertImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

  const MasonryGrid = ({ images }: { images: ConcertImage[] }) => {
    return (
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          250: 2,
          500: 3,
          1000: 4,
          1200: 5,
          6: 1500,
          7: 1600,
        }}
      >
        <Masonry gutter={"1em"}>
          {images.map((item, index) => {
            return (
              <GridItem
                key={index}
                referrerPolicy="no-referrer"
                src={item.url}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    );
  };

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
      <GridContainer>
        <MasonryGrid images={images} />
      </GridContainer>
      {isOpen && (
        <Lightbox
          imageCaption={`${images[photoIndex].venue} | ${images[photoIndex].date}`}
          imageTitle={images[photoIndex].artist}
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </Container>
  );
};

export default Photos;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
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
`;

const GridContainer = styled.div`
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-top: 1.5em;
`;

const GridItem = styled.img`
  cursor: pointer;
`;
