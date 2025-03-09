import "./ImageOverlay.css";
import { Image } from "../../typings/Images";
import { useEffect, useState } from "react";
import {
  getFavourites,
  removeFromFavorites,
  saveToFavourites,
} from "../../data/favouriteStorage";

export default function ImageOverlay({ image }: { image: Image }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<string[]>([]); // array of favourites, used to determine if image favourited or not

  // Function to split ALT text into possible title. Splitting ALT in first 4 words. (Usual pattern) (there's no title in API)
  function converAltToTitle(alt: string) {
    const words = alt.split(" ");
    const title = words.slice(0, 4).join(" ");
    return title;
  }

  function handleFavouriting(imageID: number) {
    // remove from favourites
    if (favourites.includes(image.id.toString())) {
      const newFavourites = removeFromFavorites(imageID); // used return from remove from favourites function to ensure newest data
      setFavourites(newFavourites);
      return;
    }
    // add to favourites
    const newFavourites = saveToFavourites(imageID); // used return from save favourites function to ensure newest data
    setFavourites(newFavourites);
  }

  // Initial fetch of favourites
  useEffect(() => {
    const currentFavourites = getFavourites();
    setFavourites(currentFavourites);
  }, []);

  return (
    <div
      className="image-overlay-container"
      style={{ opacity: visible ? 1 : 0 }} // Hover state control
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="image-overlay-texts">
        <span className="font-bold text-title">{converAltToTitle(image.alt)}</span>
        <div className="image-overlay-divider" />
        <span className="font-medium-italic">{image.photographer}</span>
      </div>
      <button
        className="image-overlay-button"
        onClick={() => handleFavouriting(image.id)}
      >
        {favourites.includes(image.id.toString()) ? "Unfavourite" : "Favourite"}
      </button>
    </div>
  );
}
