import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
  // Removed strict mode to avoid duplication render on dev phase. (aka use effect duplication)
);
