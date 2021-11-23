import React from "react";
import classes from "./Overlay.module.css";
function Overlay(props) {
  return <div className={classes.overlay} onClick={props.onCloseModal}></div>;
}

export default Overlay;
