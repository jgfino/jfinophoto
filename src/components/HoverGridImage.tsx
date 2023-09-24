import React from "react";
import styled, { css } from "styled-components";
import { ConcertImage } from "../types";

export interface HoverImageProps extends ConcertImage {
  url: string;
  orientation: "landscape" | "portrait";
  showOverlay?: boolean;
  onClick?: () => void;
  order?: number;
  landscape?: boolean;
}

const HoverImage: React.FC<HoverImageProps> = ({
  url,
  orientation,
  onClick,
  showOverlay,
  order,
  landscape,
  ...image
}) => {
  return (
    <Container
      landscape={landscape}
      orientation={orientation}
      onClick={onClick}
      style={{ order: order }}
    >
      <Image src={url} />
      {showOverlay && (
        <Overlay>
          <Title>{image.artist}</Title>
          <Text>{image.venue}</Text>
          <DateText>{image.date}</DateText>
        </Overlay>
      )}
    </Container>
  );
};

export default HoverImage;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const textCss = css`
  color: white;
  font-size: 2rem;
  font-family: ${({ theme }) => theme.fontFamily.main};
  text-align: center;
`;

const Title = styled.span`
  ${textCss}
  font-size: 2.5rem;
  margin-left: 10px;
  margin-right: 10px;
`;

const Text = styled.span`
  ${textCss}
  font-size: 1.9rem
`;

const DateText = styled.span`
  ${textCss}
  font-size: 1.5rem;
`;

const Container = styled.div<{
  orientation: "landscape" | "portrait";
  landscape?: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  grid-column-end: ${(props) =>
    props.orientation === "landscape"
      ? props.landscape
        ? "span 4"
        : "span 4"
      : "span 2"};
  grid-row-end: ${(props) =>
    props.orientation === "landscape"
      ? props.landscape
        ? "span 1"
        : "span 1"
      : "span 1"};
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
