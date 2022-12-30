import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import { ConcertImage } from "../types";
import useWindowDimensions from "../utils/useWindowDimensions";
import { isMobile } from "react-device-detect";

interface MasonryLightboxProps {
  images: ConcertImage[];
  showCaption?: boolean;
  small?: boolean;
}

interface OrientationImage extends ConcertImage {
  url: string;
  orientation: "landscape" | "portrait";
}

const MasonryLightbox: React.FC<MasonryLightboxProps> = ({
  images,
  showCaption = true,
  small,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const [openPhoto, setOpenPhoto] = useState<ConcertImage>();

  const { width } = useWindowDimensions();

  const [mappedImages, setMappedImages] = useState<OrientationImage[]>([]);
  const [numColumns, setNumColumns] = useState(7);

  useEffect(() => {
    let newCols = isMobile ? 2 : Math.max(2, width / 300);

    if (small && newCols > 2) {
      newCols += 1;
    }

    setNumColumns(newCols);
  }, [width, small]);

  useEffect(() => {
    setMappedImages([]);
    images.forEach((image) => {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = image.url;
      img.onload = () => {
        if (img.width > img.height) {
          setMappedImages((prev) => [
            ...prev,
            { ...image, orientation: "landscape" },
          ]);
        } else {
          setMappedImages((prev) => [
            ...prev,
            { ...image, orientation: "portrait" },
          ]);
        }
      };
    });
  }, [images]);

  // titles={images.map((image) => image.artist)}
  //  captions={images.map((image) => `${image.venue} | ${image.date}`)}

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
              key={index}
              onClick={() => {
                setPhotoIndex(index);
                setOpenPhoto(image);
              }}
              src={image.url}
            />
          ) : (
            <VImage
              key={index}
              src={image.url}
              onClick={() => {
                setPhotoIndex(index);
                setOpenPhoto(image);
              }}
            />
          )
        )}
      </Grid>
      {openPhoto && (
        // @ts-ignore
        <Lightbox
          imageTitle={
            showCaption
              ? `${openPhoto.artist} | ${openPhoto.venue} | ${openPhoto.date}`
              : undefined
          }
          mainSrc={mappedImages[photoIndex].url}
          nextSrc={mappedImages[(photoIndex + 1) % images.length].url}
          prevSrc={
            mappedImages[(photoIndex + images.length - 1) % images.length].url
          }
          onCloseRequest={() => setOpenPhoto(undefined)}
          onMovePrevRequest={() => {
            const newIndex = (photoIndex + images.length - 1) % images.length;
            setPhotoIndex(newIndex);
            setOpenPhoto(mappedImages[newIndex]);
          }}
          onMoveNextRequest={() => {
            const newIndex = (photoIndex + 1) % images.length;
            setPhotoIndex(newIndex);
            setOpenPhoto(mappedImages[newIndex]);
          }}
        />
      )}
    </div>
  );
};

export default MasonryLightbox;

const Grid = styled.div`
  display: grid;
  grid-gap: 0.8em;
  grid-auto-flow: row dense;
  margin-top: 1.5em;
  margin-left: 5rem;
  margin-right: 5rem;
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
