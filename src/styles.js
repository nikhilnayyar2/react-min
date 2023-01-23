import { createUseStyles } from "react-jss";

const checkboxSize = "17";

const useStyles = createUseStyles({
  root: {
    position: "relative",
    width: (props) => `${props.size || checkboxSize}px`,
    height: (props) => `${props.size || checkboxSize}px`,
    overflow: "hidden",
    boxSizing: "border-box",
    border: "1px solid #D8E0F0",
    borderRadius: "4px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& input": {
      position: "absolute",
      top: "0",
      left: "0",
      margin: "0",
      zIndex: "1",
      opacity: "0",
      width: (props) => `${props.size || checkboxSize}px`,
      height: (props) => `${props.size || checkboxSize}px`,
      cursor: "pointer",
    },

    "&.checked": {
      border: "none",
      backgroundColor: "#00ADE7",
    },
  },
  checked: {
    width: "50%",
    height: "50%",
    display: "flex",
    position: "absolute",
    transform: "rotate(-45deg) translate(8%, -26%)",
    alignItems: "flex-end",
    justifyContent: "flex-start",

    "& span": {
      display: "inline-block",
      background: "white",
    },

    "& span:first-child": {
      width: "25%",
      height: "64%",
    },

    "& span:last-child": {
      width: "75%",
      height: "25%",
    },
  },
});

export default useStyles;
