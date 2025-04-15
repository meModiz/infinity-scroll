import { useEffect, useState } from "react";
import fetchImage from "../data/fetchImage";
import { Image } from "../typings/Images";

export function useImageUpdate(pageNumber: number) {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true); // State for checking if there are more photos in api
  const [loading, setLoading] = useState<boolean>(false); // State used for checking if images are loading or already loaded. (Used to create fake image cards for better experience)
  const [images, setImages] = useState<Image[]>([]); // Image array to render them

  async function fetchUpdateImages() {
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
    fetchUpdateImages();
  }, [pageNumber]);

  return { hasNextPage, loading, images };
}
