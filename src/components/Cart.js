import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import SummaryCard from "./SummaryCard";
import CheckoutForm from "./CheckoutForm";
import cartlogo from "../images/icons8-cart-24.png";
import CartContext from "../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [toggleCheckOut, setToggleCheckOut] = useState(false);

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const checkoutHandler = () => {
    setToggleCheckOut(true);
  };
  const cancelCheckout = () => {
    setToggleCheckOut(false);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onCloseModal}>Close</button>
      {hasItems && <button onClick={checkoutHandler}>Order</button>}
    </div>
  );
  return (
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
      {toggleCheckOut && <CheckoutForm onCancelCheckout={cancelCheckout} />}
      {!toggleCheckOut && modalActions}
    </div>
  );
}

export default Cart;
