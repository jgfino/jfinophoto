import { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderBar from "../components/HeaderBar";
import { IoShuffle as Shuffle } from "react-icons/io5";
import LoadingPage from "../components/LoadingPage";
import { getPortolio } from "../apiClient";
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

const Photos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState<ConcertImage[]>([]);

  const onShuffle = () => {
    setImages((prev) => {
      return shuffle(shuffle(prev));
    });
  };

  useEffect(() => {
    getPortolio()
      .then((data) => {
        setImages(shuffle(data));
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (images) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [images]);

  if (error) return <ErrorPage />;

  return (
    <Container>
      <div>
        <HeaderBar activePath="live" />
        <RefreshContainer>
          <RefreshButton onClick={onShuffle}>
            <Shuffle size={"2em"} />
          </RefreshButton>
        </RefreshContainer>
      </div>
      {loading ? <LoadingPage /> : <LightboxGrid images={images} />}
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
