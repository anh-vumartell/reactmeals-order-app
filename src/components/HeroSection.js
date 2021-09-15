import React from "react";
import classes from "./HeroSection.module.css";
function HeroSection(props) {
  return <div className={classes["hero-section"]}>{props.children}</div>;
}

export default HeroSection;
