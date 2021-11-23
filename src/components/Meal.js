import React, { useContext } from "react";
import { useFormik } from "formik";
import classes from "./Meal.module.css";

import CartContext from "../store/cart-context";
function Meal(props) {
  // const [enteredAmount, setEnteredAmount] = useState(1);
  // const inputRef = useRef();
  const cartCtx = useContext(CartContext);

  // const inputHandler = (e) => {
  //   e.persist();
  //   setEnteredAmount(e.target.value);
  // };

  //function to handler the input amount
  // // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // setEnteredAmount(inputRef.current.value); //always a string
  // };
  //Function to add to cart
  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      dish: props.dish,
      amount: formik.values.amount,
      price: props.price,
    });
  };

  //FORMIK
  const formik = useFormik({
    initialValues: { amount: 1 },
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  return (
    <div className={classes["meal-card"]}>
      <div className={classes["meal-card__header"]}>
        <img src={props.imgURL} alt="cover" />
      </div>
      <div className={classes["meal-card__tags"]}>
        <span className={classes["meal-tags__category"]}>{props.category}</span>
        <span className={classes["meal-tags__cuisine"]}>{props.cuisine}</span>
      </div>

      <h3>{props.dish}</h3>
      <h4>${props.price}</h4>

      <form onSubmit={formik.handleSubmit} className={classes["form-add"]}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          name="amount"
        />
        <button type="submit" onClick={addToCartHandler}>
          Add to cart
        </button>
      </form>
    </div>
  );
}

export default Meal;
