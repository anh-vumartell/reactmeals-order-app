import React, { useContext } from "react";
import classes from "../UI/Header.module.css";
import cartlogo from "../images/icons8-cart-24.png";
import CartContext from "../store/cart-context";

function Header(props) {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <div className={classes.header}>
      <h1>ReactMeals</h1>
      <span>Menu</span>
      <span>Log in</span>
      <span>Contact</span>
      <button className={classes.cart} onClick={props.onOpenModal}>
        <img src={cartlogo} alt="" />
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </div>
  );
}

export default Header;
