import NextImage from "next/image";

import { useState, useEffect } from "react";

interface ImageThumbnailProps {
    imageUrl: string,
    altText: string,
    wSize: number,
    hSize: number
};

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ imageUrl, altText, wSize, hSize }) => {
    return (
        <NextImage 
            src={imageUrl} 
            alt={altText} 
            width={wSize}
            height={hSize} />
    );
};