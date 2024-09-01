import NextImage from "next/image";

import { useState, useEffect } from "react";

interface ImageThumbnailProps {
    imageUrl: string,
    altText: string
};

interface ImageDimensions {
    imageHeight: number,
    imageWidth: number
};

const getMeta = async (url: string) => {
  const img = new Image();
  img.src = url;
  await img.decode();  
  return img
};

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ imageUrl, altText }) => {
    const [ imageDimensions, setDimensions ] = useState<ImageDimensions>({ imageHeight: 100, imageWidth: 100});
    
    useEffect(() => {
        const retrieveImageDimensions = async () => {
            const imageMeta = await getMeta(imageUrl);
            const imageDimensions: ImageDimensions = {
                imageHeight: imageMeta.naturalHeight,
                imageWidth: imageMeta.naturalWidth
            };
            setDimensions(imageDimensions);
        };
        retrieveImageDimensions();
    });

    return (
        <NextImage className="drop-shadow-lg hover:drop-shadow-2xl aspect-square object-cover" 
            src={imageUrl} 
            alt={altText} 
            width={imageDimensions.imageWidth}
            height={imageDimensions.imageHeight} />
    );
};