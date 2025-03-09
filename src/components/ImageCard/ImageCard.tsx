import { useState } from "react";
import { Image } from "../../typings/Images";
import ImageOverlay from "../ImageOverlay/ImageOverlay";
import "./ImageCard.css";
export default function ImageCard({ image }: { image: Image }) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <>
      <ImageOverlay image={image} />
      <img
        key={image.id}
        src={image.src.large}
        srcSet={`
        ${image.src.small} 173w,
        ${image.src.tiny} 280w,
        ${image.src.medium} 467w,
        ${image.src.large} 940w,
      `} // small and medium width calculations made with aspect ratio calculator (4/3)
        sizes="(max-width: 425px) 365px, (max-width: 768px) 320px, (max-width: 1024px) 295px, 433px"
        loading="lazy"
        alt={image.alt}
        style={{
          background: loaded ? "transparent" : image.avg_color, // more aesthetic way to render not loaded images
          filter: loaded ? "none" : "blur(1px)",
        }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
