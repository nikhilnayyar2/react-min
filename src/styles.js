import { createUseStyles } from "react-jss";

const popupArrow = {
  width: ".71428571rem",
  outerSize: "-.30714286rem",
  displacement: "1rem",
};

const useStyles = createUseStyles({
  popup: {
    top: "0",
    left: "0",
    display: "block",
    position: "absolute",
    opacity: "0",
    zIndex: "1900",
    background: (props) => (props.inverted ? "black" : "white"),
    color: (props) => (props.inverted ? "white" : "black"),
    padding: "0.5rem 1rem",
    boxShadow: (props) => (!props.inverted ? "0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.15)" : "none"),
    border: (props) => (!props.inverted ? "1px solid #d4d4d5" : "none"),

    "&::before": {
      position: "absolute",
      content: "''",
      width: popupArrow.width,
      height: popupArrow.width,
      background: (props) => (props.inverted ? "black" : "white"),
      transform: "rotate(45deg)",
      zIndex: "2",
      boxShadow: (props) => (!props.inverted ? "1px 1px 0 0 #bababc" : "none"),
    },

    "&.top.left::before": {
      bottom: popupArrow.outerSize,
      left: popupArrow.displacement,
    },
    "&.top.center::before": {
      bottom: popupArrow.outerSize,
      left: "50%",
      marginLeft: popupArrow.outerSize,
    },
    "&.top.right::before": {
      bottom: popupArrow.outerSize,
      right: popupArrow.displacement,
    },

    "&.bottom.left::before": {
      top: popupArrow.outerSize,
      left: popupArrow.displacement,
    },
    "&.bottom.center::before": {
      marginLeft: popupArrow.outerSize,
      top: popupArrow.outerSize,
      left: "50%",
    },
    "&.bottom.right::before": {
      top: popupArrow.outerSize,
      right: popupArrow.displacement,
    },

    "&.left.center::before": {
      top: "50%",
      right: popupArrow.outerSize,
      marginTop: popupArrow.outerSize,
    },
    "&.right.center::before": {
      top: "50%",
      left: popupArrow.outerSize,
      marginTop: popupArrow.outerSize,
    },
  },
});

export default useStyles;
