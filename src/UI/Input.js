import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => (
  <fieldset className={classes.input}>
    <label htmlFor={props.label}>{props.label}</label>
    <input
      id={props.id}
      ref={ref}
      {...props.input}
      onChange={props.onChange}
      value={props.value}
    />
  </fieldset>
));

export default Input;
