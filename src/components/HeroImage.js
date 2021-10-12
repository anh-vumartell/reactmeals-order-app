import React from "react";
import classes from "./HeroImage.module.css";

function HeroImage(props) {
  return <div className={classes.backdrop}>{props.children}</div>;
}

export default HeroImage;
