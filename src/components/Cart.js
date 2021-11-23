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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState({ sent: false, msg: "" });
  const [toggleCheckOut, setToggleCheckOut] = useState(false);

  //Handler send request to backend

  const sendOrderHandler = async (userData) => {
    const order = {
      orderID: Math.random().toFixed(2),
      orderItems: [...cartCtx.items],
      orderAmount: cartCtx.totalAmount,
    };

    try {
      const response = await fetch(
        "https://react-meals-cbcd5-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData.values, order: order }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      setIsSubmitting(userData.isSubmitting);

      if (userData.isValid) {
        setOrderStatus({
          sent: userData.status.sent,
          msg: userData.status.msg,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(isSubmitting);
  console.log(orderStatus);
  //Using Cart Context

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

  const clearCartHandler = () => {
    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onCloseModal}>Close</button>
      {hasItems && <button onClick={checkoutHandler}>Order</button>}
      {hasItems && (
        <button
          className={classes["btn-clear"]}
          type="button"
          onClick={clearCartHandler}
        >
          {" "}
          Clear cart
        </button>
      )}
    </div>
  );
  let feedbackContent;
  if (isSubmitting === true) {
    feedbackContent = (
      <div className={classes["form-checkout__feedback"]}>
        <p className={classes["message-text"]}>
          Your order is being submitted...
        </p>
      </div>
    );
  }
  if (Object.entries(orderStatus).length !== 0) {
    feedbackContent = (
      <div className={classes["feedback"]}>
        <p className={classes["message-text"]}>{orderStatus.msg}</p>
      </div>
    );
  }

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
      {toggleCheckOut && (
        <CheckoutForm
          onConfirm={sendOrderHandler}
          onCancelCheckout={cancelCheckout}
          onCloseModal={props.onCloseModal}
        />
      )}
      {!toggleCheckOut && modalActions}
      {feedbackContent}
    </div>
  );
}

export default Cart;
