import { useEffect, useState } from "react";
import styled from "styled-components";
import { getGalleries } from "../apiClient";
import ConcertTile from "../components/ConcertTile";
import ErrorPage from "../components/ErrorPage";
import FooterBar from "../components/FooterBar";
import HeaderBar from "../components/HeaderBar";
import LoadingPage from "../components/LoadingPage";
import { Concert } from "../types";

interface GalleriesPageProps {
  type: "concerts" | "festivals";
}

const Concerts: React.FC<GalleriesPageProps> = ({ type }) => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getGalleries(type)
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
      <HeaderBar />
      <GridContainer>
        {concerts.map((concert) => (
          <ConcertTile
            key={concert.id}
            image={""}
            artist={concert.artist}
            location={concert.venue}
            date={concert.date}
            dest={`/galleries/${type}/${concert.id}/${concert.artistId!}`}
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
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 3em;
  margin-top: 2em;
  margin-left: 5rem;
  margin-right: 5rem;
  padding-bottom: 1.5em;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;
