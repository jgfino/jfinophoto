import React, { useEffect, useRef, useState } from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import { ConcertImage } from "../types";
import useWindowDimensions from "../utils/useWindowDimensions";
import HoverImage, { HoverImageProps } from "./HoverGridImage";
import LoadingPage from "./LoadingPage";

interface MasonryLightboxProps {
  images: ConcertImage[];
  showCaption?: boolean;
  small?: boolean;
  loading?: boolean;
  onLoaded?: () => void;
}

const MasonryLightbox: React.FC<MasonryLightboxProps> = ({
  images,
  showCaption = true,
  small,
  loading,
  onLoaded,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const [openPhoto, setOpenPhoto] = useState<ConcertImage>();

  const {
    windowDimensions: { width },
    shouldRenderMobile,
    isTablet,
  } = useWindowDimensions();

  const [mappedImages, setMappedImages] = useState<HoverImageProps[]>([]);
  const tempMapped = useRef<HoverImageProps[]>([]);
  const [numColumns, setNumColumns] = useState(7);

  useEffect(() => {
    const deskCols = Math.max(2, width / 300);
    let newCols = Math.ceil(
      shouldRenderMobile ? (isTablet ? deskCols : 2) : deskCols
    );

    if (small && newCols >= 2) {
      newCols += 1;
    }

    setNumColumns(newCols);
  }, [width, small, shouldRenderMobile]);

  useEffect(() => {
    setMappedImages([]);
    images.forEach((image) => {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = image.url;
      img.onload = () => {
        if (img.width > img.height) {
          tempMapped.current.push({ ...image, orientation: "landscape" });
        } else {
          tempMapped.current.push({ ...image, orientation: "portrait" });
        }

        if (tempMapped.current.length === images.length) {
          setMappedImages(tempMapped.current);
          tempMapped.current = [];
          onLoaded?.();
        }
      };
    });
  }, [images, onLoaded]);

  return (
    <div>
      <Grid
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            100 / (numColumns + 1)
          }%, 1fr))`,
        }}
      >
        {mappedImages.map((image, index) => (
          <HoverImage
            key={image.url}
            {...image}
            showOverlay={showCaption}
            orientation={image.orientation}
            url={image.url}
            onClick={() => {
              setPhotoIndex(index);
              setOpenPhoto(image);
            }}
          />
        ))}
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
      {loading && <LoadingPage percentage />}
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
