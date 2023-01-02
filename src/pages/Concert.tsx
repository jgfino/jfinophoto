import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getConcert } from "../apiClient";
import HeaderBar from "../components/HeaderBar";
import { ConcertDetails } from "../types";
import ErrorPage from "../components/ErrorPage";
import LoadingPage from "../components/LoadingPage";
import FooterBar from "../components/FooterBar";
import LightboxGrid from "../components/LightboxGrid";
import { shuffle } from "./Photos";

const Concert = () => {
  const [concert, setConcert] = useState<ConcertDetails>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    getConcert(id)
      .then((data) => {
        data.photos = shuffle(data.photos);
        setConcert(data);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error || !concert) return <ErrorPage />;

  return (
    <Container>
      <HeaderBar activePath="galleries" />
      <TitleContainer>
        <Title>{concert.artist}</Title>
        <SubTitle>{`${concert.venue} || ${concert.date}`}</SubTitle>
      </TitleContainer>
      <LightboxGrid showCaption={false} small images={concert.photos} />
      <FooterBar />
    </Container>
  );
};

export default Concert;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  overflow: hidden;
`;

const Title = styled.span`
  font-size: 3.5rem;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
`;

const SubTitle = styled.span`
  font-size: 1.7rem;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
`;
