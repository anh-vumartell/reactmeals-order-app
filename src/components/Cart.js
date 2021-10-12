import React, { useContext } from "react";
import "animate.css";
import { Animated } from "react-animated-css";
import classes from "./Cart.module.css";
import SummaryCard from "./SummaryCard";
import cartlogo from "../images/icons8-cart-24.png";
import CartContext from "../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  return (
    <Animated
      animationIn="bounceInLeft"
      animationInDelay={500}
      animationOutDuration={500}
      animationOut="fadeOut"
      isVisible={props.isVisible}
    >
      <div className={classes.cart}>
        <div className={classes["cart-header"]}>
          <img src={cartlogo} alt="" />
          <h2>Cart Summary</h2>
        </div>
        {hasItems ? (
          <SummaryCard onAdd={addItemHandler} onRemove={removeItemHandler} />
        ) : (
          <p className={classes.alert}>
            Your cart is empty. Maybe add some meals?
          </p>
        )}

        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onCloseModal}>Close</button>
          {hasItems && <button>Order</button>}
        </div>
      </div>
    </Animated>
  );
}

export default Cart;
