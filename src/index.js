import { createRoot } from "react-dom/client";
import Checkbox from "./Checkbox";

function App() {
  return <Checkbox index="1" />;
}

createRoot(document.getElementById("root")).render(<App />);
