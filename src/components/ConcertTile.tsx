import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ConcertTileProps {
  artist: string;
  date: string;
  location: string;
  image: string;
  dest: string;
}

const ConcertTile: React.FC<ConcertTileProps> = ({
  artist,
  date,
  location,
  image,
  dest,
}) => {
  return (
    <Container to={`/galleries/${dest}`}>
      <ImageHolder>
        <Cover loading="lazy" src={image} referrerPolicy="no-referrer" />
      </ImageHolder>
      <DateText>{date}</DateText>
      <Title>{artist}</Title>
      <SubTitle>{location}</SubTitle>
    </Container>
  );
};

export default ConcertTile;

const Container = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  text-align: center;
`;

const ImageHolder = styled.div`
  aspect-ratio: 1;
  border-radius: 18em;
  position: relative;
  overflow: hidden;
  margin-bottom: 1em;
`;

const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
`;

const DateText = styled.p`
  font-size: 1.4em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Title = styled.p`
  font-size: 2.2em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 500;
`;

const SubTitle = styled.p`
  font-size: 1.4em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
