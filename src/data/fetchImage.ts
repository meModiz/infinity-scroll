import { Image } from "../typings/Images";

// based on page number function fetches images from Pexels API (https://www.pexels.com/api/)
export default async function fetchImage(pageNumber: number) {
  const query: string = "nature";
  const apiURL: string = `https://api.pexels.com/v1/search?query=${query}&page=${pageNumber}&per_page=9&size=small`;
  const apiKey: string = import.meta.env.VITE_PEXELS_API_KEY;
  try {
    // API KEY required in headers as Authorization
    const response = await fetch(apiURL, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      console.error("Error fetching data from API. status:" + response.status);
      return { photoArray: [], hasMore: false };
    }

    const data = await response.json();

    const photoArray: Image[] = data.photos.map((photo: any) => {
      return {
        id: photo.id, // unique id
        src: photo.src, // images source link (4 sizes)
        photographer: photo.photographer || "Unknown",
        alt: photo.alt || "No description",
        avg_color: photo.avg_color, // avg color used for more aesthetic loading
        // photographers credits
        url: photo.url, // link to photo
        photographer_url: photo.photographer_url, // link to author profile page
      };
    });

    const hasMore: boolean = Boolean(data.next_page); // Check if there's data for another images

    return { photoArray, hasMore };
  } catch (e) {
    console.error("Error: ", e);
    const photoArray: Image[] = [];
    const hasMore = false;
    return { photoArray, hasMore };
  }
}
