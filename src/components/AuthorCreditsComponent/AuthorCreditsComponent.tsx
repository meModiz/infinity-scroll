import { Image } from "../../typings/Images";
import "./AuthorCreditsComponent.css";
export default function AuthorCreditsComponent({ image }: { image: Image }) {
  return (
    <span className="credit-text">
      <a href={image.url}>Photo</a> was taken by{" "}
      <a href={image.photographer_url}>{image.photographer}</a> on{" "}
      <a href="https://www.pexels.com">Pexels</a>
    </span>
  );
}
