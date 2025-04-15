import { useRef, useState } from "react";
import "./App.css";
import { useImageUpdate } from "./hooks/useImageUpdate";
import ImagesListComponent from "./components/ImagesListComponent/ImagesListComponent";
import FakeImagesList from "./components/ImagesListComponent/FakeImagesList/FakeImagesList";
import useInfinityScroll from "./hooks/useInfinityScroll";

export default function App() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { hasNextPage, loading, images } = useImageUpdate(pageNumber);
  const TriggerableImageRef = useRef(null);

  useInfinityScroll({
    images,
    hasNextPage,
    setPageNumber: () => setPageNumber((prevPageNumber) => prevPageNumber + 1),
    TriggerableImageRef,
  });

  return (
    <div className="main-container">
      {images.length > 0 ? (
        <div className="gallery-container">
          <ImagesListComponent
            images={images}
            TriggerableImageRef={TriggerableImageRef}
          />
          {loading && <FakeImagesList />}
          {hasNextPage === false && <div className="gallery-end">No more data...</div>}
        </div>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
