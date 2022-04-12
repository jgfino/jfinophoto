import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getConcert } from "../apiClient";
import HeaderBar from "../components/HeaderBar";
import { ConcertDetails, ConcertImage } from "../types";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Concert = () => {
  const [concert, setConcert] = useState<ConcertDetails>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getConcert(id)
      .then((data) => {
        data.photos = data.photos.sort(() => 0.5 - Math.random());
        setConcert(data);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !concert) return null;

  // if (error) return errorpage

  const MasonryGrid = ({ images }: { images: string[] }) => {
    return (
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 750: 2, 900: 3, 1200: 4, 2000: 5 }}
      >
        <Masonry gutter={"1.5em"}>
          {images.map((item, index) => {
            return (
              <GridItem
                referrerPolicy="no-referrer"
                src={item}
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

  return (
    <Container>
      <HeaderBar activePath="concerts" />
      <Title>{concert.artist}</Title>
      <SubTitle>{`${concert.venue} || ${concert.date}`}</SubTitle>
      <GridContainer>
        <MasonryGrid images={concert.photos} />
        {isOpen && (
          <Lightbox
            mainSrc={concert.photos[photoIndex]}
            nextSrc={concert.photos[(photoIndex + 1) % concert.photos.length]}
            prevSrc={
              concert.photos[
                (photoIndex + concert.photos.length - 1) % concert.photos.length
              ]
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + concert.photos.length - 1) % concert.photos.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % concert.photos.length)
            }
          />
        )}
      </GridContainer>
    </Container>
  );
};

export default Concert;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  text-align: center;
`;

const Title = styled.p`
  font-size: 3.5rem;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 1em;
  margin-top: 2em;
  margin-left: 1.5em;
  margin-right: 1.5em;
  padding-bottom: 1.5em;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const GridItem = styled.img`
  cursor: pointer;
`;
