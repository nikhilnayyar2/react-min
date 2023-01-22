import { createRoot } from "react-dom/client";
import Popup from "./Popup";

const content = Array(150).fill("Lorem ipsum dolor sit amet.").join(" ");
const content2 = Array(10).fill("Lorem ipsum dolor sit amet.").join(" ");

function App() {
  return (
    <p>
      {content}
      <Popup
        trigger={
          <span id="popup-target" style={{ background: "yellow" }}>
            {content2}
          </span>
        }
        content="I am tooltip text yes"
        position="top left"
        inverted
      />
      {content}
    </p>
  );
}

createRoot(document.getElementById("root")).render(<App />);
