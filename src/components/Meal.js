import React, { useState, useRef, useContext } from "react";
import classes from "./Meal.module.css";
import Input from "../UI/Input";
import CartContext from "../store/cart-context";
function Meal(props) {
  const [enteredAmount, setEnteredAmount] = useState(1);
  const inputRef = useRef();
  const cartCtx = useContext(CartContext);

  const inputHandler = (e) => {
    e.persist();
    setEnteredAmount(e.target.value);
  };

  //function to handler the input amount
  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredAmount(inputRef.current.value); //always a string
  };
  //Function to add to cart
  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      dish: props.dish,
      amount: +enteredAmount,
      price: props.price,
    });
  };

  return (
    <div className={classes["meal-card"]}>
      <div className={classes["card-col-left"]}>
        <div className={classes["meal-tags"]}>
          <span className={classes["meal-tags__category"]}>
            {props.category}
          </span>
          <span className={classes["meal-tags__cuisine"]}>{props.cuisine}</span>
        </div>

        <h3>{props.dish}</h3>
        <h4>${props.price}</h4>
      </div>

      <div className={classes["card-col-right"]}>
        <form onSubmit={submitHandler}>
          <Input
            value={enteredAmount}
            onChange={inputHandler}
            id={props.id}
            ref={inputRef}
            label="Amount"
            input={{ defaultValue: "1", min: "1", max: "5", type: "number" }}
          />
        </form>
        <button type="submit" onClick={addToCartHandler}>
          + Add
        </button>
      </div>
    </div>
  );
}

export default Meal;
