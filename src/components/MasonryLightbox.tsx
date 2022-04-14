import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
//@ts-ignore
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface MasonryLightboxProps {
  columnsCountBreakPoints: { [key: number]: number };
  spacing: string;
  images: string[];
  titles?: string[];
  captions?: string[];
}

const MasonryLightbox: React.FC<MasonryLightboxProps> = ({
  columnsCountBreakPoints,
  images,
  spacing,
  titles,
  captions,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <GridContainer>
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry gutter={spacing}>
            {images.map((item, index) => {
              return (
                <GridItem
                  key={index}
                  referrerPolicy="no-referrer"
                  src={item}
                  onClick={() => {
                    setPhotoIndex(index);
                    setIsOpen(true);
                  }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </GridContainer>
      {isOpen && (
        <Lightbox
          imageCaption={captions && captions[photoIndex]}
          imageTitle={titles && titles[photoIndex]}
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
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

const GridContainer = styled.div`
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-top: 1.5em;
`;

const GridItem = styled.img`
  cursor: pointer;
`;
