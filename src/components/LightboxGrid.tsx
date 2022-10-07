import React, { useEffect, useRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import useWindowDimensions from "../utils/useWindowDimensions";

interface MasonryLightboxProps {
  images: string[];
  titles?: string[];
  captions?: string[];
  small?: boolean;
}

interface OrientationImage {
  url: string;
  orientation: "landscape" | "portrait";
}

const MasonryLightbox: React.FC<MasonryLightboxProps> = ({
  images,
  titles,
  captions,
  small,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { width } = useWindowDimensions();

  const [mappedImages, setMappedImages] = useState<OrientationImage[]>([]);
  const [numColumns, setNumColumns] = useState(7);

  const shouldKeepLoading = useRef(false);

  useEffect(() => {
    let newCols = 5;
    if (width < 500) {
      newCols = 1;
    } else if (width < 750) {
      newCols = 2;
    } else if (width < 1000) {
      newCols = 3;
    } else if (width < 1200) {
      newCols = 4;
    } else if (width < 2000) {
      newCols = 5;
    } else if (width < 2800) {
      newCols = 6;
    } else {
      newCols = 7;
    }

    if (small && newCols > 2) {
      newCols += 1;
    }

    setNumColumns(newCols);
  }, [width, small]);

  useEffect(() => {
    images.forEach((url, index) => {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = url;
      img.onload = () => {
        if (img.width > img.height) {
          setMappedImages((prev) => [
            ...prev,
            { url, orientation: "landscape" },
          ]);
        } else {
          setMappedImages((prev) => [
            ...prev,
            { url, orientation: "portrait" },
          ]);
        }
      };
    });
  }, [images]);

  return (
    <div>
      <Grid
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            100 / (numColumns + 1)
          }%, 1fr))`,
        }}
      >
        {mappedImages.map((image, index) =>
          image.orientation === "landscape" ? (
            <HImage
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
              src={image.url}
            />
          ) : (
            <VImage
              src={image.url}
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
          )
        )}
      </Grid>
      {isOpen && (
        <Lightbox
          imageTitle={captions && captions[photoIndex]}
          imageCaption={titles && titles[photoIndex]}
          mainSrc={mappedImages[photoIndex].url}
          nextSrc={mappedImages[(photoIndex + 1) % images.length].url}
          prevSrc={
            mappedImages[(photoIndex + images.length - 1) % images.length].url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default MasonryLightbox;

const Grid = styled.div`
  display: grid;
  grid-gap: 0.5em;
  grid-auto-flow: row dense;
  margin-top: 1em;
`;

const HImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-column-end: span 2;
  pointer: cursor;
  zindex: 3;
`;

const VImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-row-end: span 1;
  pointer: cursor;
  zindex: 3;
`;
