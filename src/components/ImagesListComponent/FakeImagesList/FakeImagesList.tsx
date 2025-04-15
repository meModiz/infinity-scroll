import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import "../ImageList.css";
export default function FakeImagesList() {
  const fakeImagesArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return fakeImagesArray.map((_, index) => (
    <div className="gallery-item" key={index}>
      <LoadingSpinner />
    </div>
  ));
}
