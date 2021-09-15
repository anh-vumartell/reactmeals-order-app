import React from "react";
import classes from "./MealGrid.module.css";
import Meal from "./Meal";
function MealGrid(props) {
  return (
    <div className={classes["meal-grid"]}>
      {props.meals.map((meal) => {
        return (
          <Meal
            id={meal.id}
            key={meal.id}
            dish={meal.dish}
            category={meal.category}
            cuisine={meal.cuisine}
            price={meal.price}
            imageUrl={meal.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default MealGrid;
