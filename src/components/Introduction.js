import React from "react";
import classes from "./Introduction.module.css";
function Introduction(props) {
  return (
    <div className={classes["introduction"]}>
      <h2>You choose meals. We deliver. Enjoy ReactMeals!</h2>
      <p>
        Whenever you are hungry and having a party. ReactMeals will cater to
        your needs.
      </p>
    </div>
  );
}

export default Introduction;
