import { Image } from "../../typings/Images";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageList.css";
export default function ImagesListComponent({
  images,
  TriggerableImageRef,
}: {
  images: Image[];
  TriggerableImageRef: any;
}) {
  return images.map((image, index) => (
    /* Sets 4th image of batch to be triggerable image for better UX experience (fetches data earlier) */
    <div
      className="gallery-item"
      key={image.id}
      ref={index === images.length - 4 ? TriggerableImageRef : null}
      data-testid="gallery_image"
    >
      <ImageCard image={image} />
      {/* Credits required by pexels api guidelines (https://www.pexels.com/api/documentation/#guidelines) */}
      {/* Uncomment this component for public deployment */}
      {/* <AuthorCreditsComponent image={image} /> */}
    </div>
  ));
}
