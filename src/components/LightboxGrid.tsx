import React, { useCallback, useEffect, useRef, useState } from "react";
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
  landscape?: boolean;
}

const getFullPreviewURL = (url: string, size: number) => {
  const withoutSize = url.substring(0, url.lastIndexOf("=s"));
  return `${withoutSize}=s${size}`;
};

const MasonryLightbox: React.FC<MasonryLightboxProps> = ({
  images,
  showCaption = true,
  small,
  loading,
  onLoaded,
  landscape,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPhoto, setOpenPhoto] = useState<ConcertImage>();

  const {
    windowDimensions: { width },
    shouldRenderMobile,
    isTablet,
  } = useWindowDimensions();

  const [mappedImages, setMappedImages] = useState<HoverImageProps[]>([]);
  const [fullImages, setFullImages] = useState<
    (HTMLImageElement | undefined)[]
  >([]);

  const tempMapped = useRef<HoverImageProps[]>([]);
  const [numColumns, setNumColumns] = useState(7);

  useEffect(() => {
    const deskCols = Math.max(4, width / (landscape ? 200 : 300));
    let newCols = Math.ceil(
      shouldRenderMobile ? (isTablet ? deskCols : 2) : deskCols
    );

    if (small && newCols >= 4 && !shouldRenderMobile) {
      newCols += 1;
    }

    setNumColumns(newCols);
  }, [width, small, shouldRenderMobile]);

  useEffect(() => {
    setMappedImages([]);
    images.forEach((image) => {
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = getFullPreviewURL(image.url, 1000);
      img.onload = () => {
        if (img.width > img.height) {
          tempMapped.current.push({
            ...image,
            orientation: "landscape",
            url: img.src,
          });
        } else {
          tempMapped.current.push({
            ...image,
            orientation: "portrait",
            url: img.src,
          });
        }

        if (tempMapped.current.length === images.length) {
          setMappedImages(tempMapped.current);
          tempMapped.current = [];
          onLoaded?.();
        }
      };
    });
  }, [images, onLoaded]);

  useEffect(() => {
    setFullImages(new Array(mappedImages.length).fill(undefined));
  }, [mappedImages]);

  const updateFullImages = useCallback(() => {
    if (!openPhoto) return;
    for (let i = photoIndex - 1; i < photoIndex + 2; i++) {
      if (!mappedImages[i] || fullImages[i]) {
        continue;
      }
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = getFullPreviewURL(mappedImages[i].url, 2500);
      img.onload = () => {
        setFullImages((prev) => {
          const newFullImages = [...prev];
          newFullImages[i] = img;
          return newFullImages;
        });
      };
    }
  }, [fullImages, mappedImages, photoIndex, openPhoto]);

  useEffect(() => {
    updateFullImages();
  }, [updateFullImages]);

  const renderImage = (image: HoverImageProps, index: number) => {
    return (
      <HoverImage
        landscape={landscape}
        order={index}
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
    );
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            100 / (numColumns + 4)
          }%, 1fr))`,
        }}
      >
        {mappedImages.map(renderImage)}
      </Grid>
      {openPhoto && (
        // @ts-ignore
        <Lightbox
          imageTitle={
            showCaption
              ? `${openPhoto.artist} | ${openPhoto.venue} | ${openPhoto.date}`
              : undefined
          }
          onAfterOpen={updateFullImages}
          mainSrc={fullImages[photoIndex]?.src ?? ""}
          nextSrc={fullImages[(photoIndex + 1) % images.length]?.src}
          prevSrc={fullImages[(photoIndex - 1) % images.length]?.src}
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
  grid-gap: 2em;
  grid-auto-flow: row dense;
  margin-top: 1.5em;
  margin-left: 5rem;
  margin-right: 5rem;
`;
