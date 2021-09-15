import React, { useContext } from "react";
import classes from "./CartModal.module.css";
import CartContext from "../store/cart-context";
import SummaryCard from "./SummaryCard";
import cartlogo from "../images/icons8-cart-24.png";
function CartModal(props) {
  const cartCtx = useContext(CartContext);

  return (
    <div className={classes.overlay} onClick={props.onCloseModal}>
      <div className={classes.modal}>
        <div className={classes["modal-header"]}>
          <img src={cartlogo} alt="" />
          <h2>Cart Summary</h2>
        </div>
        <SummaryCard />
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${cartCtx.totalAmount.toFixed(2)}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onCloseModal}>Close</button>
          <button>Order</button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
