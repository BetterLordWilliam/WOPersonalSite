import NextImage from "next/image";

import { useState } from "react";

interface ImageThumbnailProps {
    imageUrl: string,
    altText: string
};

const getMeta = async (url: string) => {
  const img = new Image();
  img.src = url;
  await img.decode();  
  return img
};

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ imageUrl, altText }) => {
    const [ imageWidth, setImageWidth ] = useState(Number);
    const [ imageHeight, setImaegHeight ] = useState(Number);

    function configureImage() {
        getMeta(imageUrl).then(imgMetadata => { 
            setImageWidth(imgMetadata.naturalWidth);
            setImaegHeight(imgMetadata.naturalHeight);
        });
    };
    configureImage();

    return (
        <NextImage className="drop-shadow-lg hover:drop-shadow-2xl aspect-square object-cover" 
            src={imageUrl} 
            alt={altText} 
            width={imageWidth}
            height={imageHeight} />
    );
};