import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => (
  <div className={classes.input}>
    <label htmlFor={props.label}>{props.label}</label>
    <input
      id={props.id}
      ref={ref}
      {...props.input}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
));

export default Input;
