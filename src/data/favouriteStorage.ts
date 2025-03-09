// used localstorage for favourited images data
// data type: JSON

export function getFavourites() {
  const favorites = localStorage.getItem("favouriteImages") || "";
  if (favorites) {
    return JSON.parse(favorites);
  }
  return favorites;
}

export function saveToFavourites(imageID: number) {
  const favourites = getFavourites();
  const updatedFavourites = [...favourites, imageID.toString()];
  localStorage.setItem("favouriteImages", JSON.stringify(updatedFavourites));

  return updatedFavourites;
}

export function removeFromFavorites(imageID: number) {
  const favourites = getFavourites();
  const updatedFavourites = favourites.filter(
    (favourite: string) => favourite !== imageID.toString()
  );

  localStorage.setItem("favouriteImages", JSON.stringify(updatedFavourites));
  return updatedFavourites;
}
