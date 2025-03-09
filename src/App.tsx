import { useEffect, useRef, useState } from "react";
import fetchImage from "./data/fetchImage";
import { Image } from "./typings/Images";
import ImageCard from "./components/ImageCard/ImageCard";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

export default function App() {
  const [images, setImages] = useState<Image[]>([]); // Image array to render them
  const [pageNumber, setPageNumber] = useState<number>(1); // Page number controls the api fetch query, so it fetches newer photos
  const [hasNextPage, setHasNextPage] = useState<boolean>(true); // State for checking if there are more photos in api
  const [loading, setLoading] = useState<boolean>(false); // State used for checking if images are loading or already loaded. (Used to create fake image cards for better experience)
  const TriggerableImageRef = useRef(null); // Used in intersection observer as observed component which triggers new fetch

  const fakeImagesArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // Api fetch function and handles inserting new images
  async function handleImageUpdate() {
    setLoading(true);
    const { photoArray, hasMore } = await fetchImage(pageNumber);
    setHasNextPage(hasMore);
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...photoArray];
      return updatedImages;
    });
    setLoading(false);
  }

  useEffect(() => {
    handleImageUpdate();
  }, [pageNumber]);

  useEffect(() => {
    if (!images.length) return; // if there's no initial images prevents from creating empty observer
    if (hasNextPage === false) return; // check is there any more data

    // new observer init, tracks the triggerable image when it enters the viewport
    const observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });

    const TriggerableImage = TriggerableImageRef.current;

    if (TriggerableImage) {
      observer.observe(TriggerableImage);
    }

    // Cleanup to prevent duplicating and memory leak
    return () => {
      if (TriggerableImage) {
        observer.unobserve(TriggerableImage);
      }
      observer.disconnect();
    };
  }, [images]);

  // function AuthorCreditsComponent({ image }: { image: Image }) {
  //   return (
  //     <span className="credit-text">
  //       <a href={image.url}>Photo</a> was taken by{" "}
  //       <a href={image.photographer_url}>{image.photographer}</a> on{" "}
  //       <a href="https://www.pexels.com">Pexels</a>
  //     </span>
  //   );
  // }

  // local image component to map images
  function ImageLocalComponent() {
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

  return (
    <div className="main-container">
      {images.length > 0 ? (
        <div className="gallery-container">
          <ImageLocalComponent />
          {loading &&
            fakeImagesArray.map((_, index) => (
              <div className="gallery-item" key={index}>
                <LoadingSpinner />
              </div>
            ))}
          {hasNextPage === false && <div className="gallery-end">No more data...</div>}
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
