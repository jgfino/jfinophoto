import { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderBar, { HeaderPath } from "../components/HeaderBar";
import { IoShuffle as Shuffle } from "react-icons/io5";
import ErrorPage from "../components/ErrorPage";
import FooterBar from "../components/FooterBar";
import { ConcertImage } from "../types";
import LightboxGrid from "../components/LightboxGrid";

export function shuffle<T>(arr: T[]) {
  const array = [...arr];
  let i = array.length - 1;
  for (i; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

interface PhotoPageProps {
  fetchImages: () => Promise<ConcertImage[]>;
  activePath?: HeaderPath;
  landscape?: boolean;
}

const Photos: React.FC<PhotoPageProps> = ({
  fetchImages,
  activePath = "live",
  landscape,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState<ConcertImage[]>([]);

  const onShuffle = () => {
    setImages((prev) => {
      return shuffle(shuffle(prev));
    });
  };

  useEffect(() => {
    fetchImages()
      .then((data) => {
        setImages(data);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, []);

  if (error) return <ErrorPage />;

  return (
    <Container>
      <div>
        <HeaderBar activePath={activePath} />
        <RefreshContainer>
          <RefreshButton onClick={onShuffle}>
            <Shuffle size={"2em"} />
          </RefreshButton>
        </RefreshContainer>
      </div>
      <LightboxGrid
        landscape={landscape}
        images={images}
        loading={loading}
        onLoaded={() => setLoading(false)}
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
  overflow: hidden;
`;

const RefreshContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;

const RefreshButton = styled.button`
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.text};
  border: none;
  width: 15em;
  cursor: pointer;
  border-radius: 1em;
  align-self: center;
  padding: 1em;
`;
