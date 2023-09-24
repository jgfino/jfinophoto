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
    <Container to={dest}>
      <DateText>{date}</DateText>
      <Title>{artist}</Title>
      <SubTitle>{location}</SubTitle>
    </Container>
  );
};

export default ConcertTile;

const Container = styled(Link)`
  cursor: pointer;
  padding: 1em;
  text-decoration: none;
  text-align: center;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  aspect-ratio: 2;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.p`
  font-size: 1.4em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Title = styled.p`
  font-size: 2em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: 500;
  lines: 1;
`;

const SubTitle = styled.p`
  font-size: 1.4em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
