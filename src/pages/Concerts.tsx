import { useEffect, useState } from "react";
import styled from "styled-components";
import { getConcerts } from "../apiClient";
import ConcertTile from "../components/ConcertTile";
import ErrorPage from "../components/ErrorPage";
import FooterBar from "../components/FooterBar";
import HeaderBar from "../components/HeaderBar";
import LoadingPage from "../components/LoadingPage";
import { ConcertPreview } from "../types";

const Concerts = () => {
  const [concerts, setConcerts] = useState<ConcertPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getConcerts()
      .then(setConcerts)
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
      <HeaderBar activePath="concerts" />
      <GridContainer>
        {concerts.map((concert) => (
          <ConcertTile
            key={concert.id}
            image={concert.coverImage}
            artist={concert.artist}
            location={concert.venue}
            date={concert.date}
            dest={concert.id}
          />
        ))}
      </GridContainer>
      <FooterBar />
    </Container>
  );
};

export default Concerts;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 3em;
  margin-top: 1.5em;
  margin-left: 1.5em;
  margin-right: 1.5em;
  padding-bottom: 1.5em;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;
