import React from 'react';
import Image from "next/image";

const BusinessImageContainer = ({image, alt}: {
  image: string | null;
  alt: string;
}) => {
  return (
    <div className="w-full aspect-video relative bg-gray-500 flex items-end justify-start overflow-hidden p-4">
      {image ? (
        <Image src={image} alt={alt} fill={true} objectFit="cover" objectPosition="center" />
      ) : (
        <span className="text-gray-700 italic text-lg">No Image</span>
      )}

    </div>
  );
};

export default BusinessImageContainer;