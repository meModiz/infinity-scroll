import { useEffect } from "react";
import { Image } from "../typings/Images";

type useInfinityScrollProps = {
  images: Image[];
  hasNextPage: boolean;
  setPageNumber: () => void;
  TriggerableImageRef: any;
};

export default function useInfinityScroll({
  images,
  hasNextPage,
  setPageNumber,
  TriggerableImageRef,
}: useInfinityScrollProps) {
  useEffect(() => {
    if (!images.length) return;
    if (hasNextPage === false) return;

    const observer = new IntersectionObserver((entries) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting) {
        setPageNumber();
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
}
