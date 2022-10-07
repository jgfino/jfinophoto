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

const Concert = () => {
  const [concert, setConcert] = useState<ConcertDetails>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error || !concert) return <ErrorPage />;

  return (
    <Container>
      <div>
        <HeaderBar activePath="concerts" />
        <Title>{concert.artist}</Title>
        <SubTitle>{`${concert.venue} || ${concert.date}`}</SubTitle>
      </div>
      <LightboxGrid small images={concert.photos} />
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
  text-align: center;
  overflow: hidden;
`;

const Title = styled.p`
  font-size: 3.5rem;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
