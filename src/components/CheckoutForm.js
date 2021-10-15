import React, { useContext, useCallback } from "react";
import classes from "./CheckoutForm.module.css";
import amex from "../images/icons/icons8-american-express.svg";
import dinersClub from "../images/icons/icons8-diners-club.svg";
import mastercard from "../images/icons/icons8-mastercard.svg";
import visa from "../images/icons/icons8-visa.svg";
import CartContext from "../store/cart-context";

function CheckoutForm(props) {
  const cartCtx = useContext(CartContext);
  const order = {
    orderID: Math.random().toFixed(2),
    orderItems: [...cartCtx.items],
    orderAmount: cartCtx.totalAmount,
  };
  const sendOrderHandler = useCallback(async (order) => {
    try {
      const response = await fetch(
        "https://react-meals-cbcd5-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify(order),
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
      console.log("Order is successfully sent.");
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  const formHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={formHandler} className={classes["form-checkout"]}>
      <div className={classes["form-container"]}>
        <div className={classes["form-group"]}>
          <h3>Billing Address</h3>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="fname"
            placeholder="Jane M. Doe"
          />
          <label className={classes["form-label__checkout"]} htmlFor="fname">
            Full name
          </label>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="email"
            placeholder="jane@mail.com"
          />
          <label className={classes["form-label__checkout"]} htmlFor="email">
            Email
          </label>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="address"
            placeholder="somewhere abc"
          />
          <label className={classes["form-label__checkout"]} htmlFor="address">
            Address
          </label>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="city"
            placeholder="Helsinki"
          />
          <label className={classes["form-label__checkout"]} htmlFor="city">
            City
          </label>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="postcode"
            placeholder="00010"
          />
          <label className={classes["form-label__checkout"]} htmlFor="postcode">
            Post code
          </label>
          <label>
            <input type="checkbox" name="sameBilling" /> Shipping address same
            as billing
          </label>
        </div>
        <div className={classes["form-group"]}>
          <h3>Payment</h3>
          <div className={classes["cards-container"]}>
            <label htmlFor="acceptedCard">Accepted Card</label>
            <ul className={classes["card-list"]}>
              <li>
                <img src={amex} alt="amex" />
              </li>
              <li>
                {" "}
                <img src={dinersClub} alt="dinersclub" />
              </li>
              <li>
                {" "}
                <img src={mastercard} alt="mastercard" />
              </li>
              <li>
                <img src={visa} alt="visa" />
              </li>
            </ul>
          </div>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="nameOnCard"
            placeholder="Jane M. Doe"
          />
          <label
            className={classes["form-label__checkout"]}
            htmlFor="nameOnCard"
          >
            Name on Card
          </label>
          <input
            className={classes["form-control__checkout"]}
            type="text"
            name="creditCardNum"
            placeholder="1111-2222-333-444"
          />
          <label
            className={classes["form-label__checkout"]}
            htmlFor="creditCardNum"
          >
            Credit Card Number
          </label>
          <div className={classes["card-date"]}>
            <div>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="expMonth"
                placeholder="January"
              />
              <label
                className={classes["form-label__checkout"]}
                htmlFor="expMonth"
              >
                Exp. Month
              </label>
            </div>
            <div>
              {" "}
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="expYear"
                placeholder="2022"
              />
              <label
                className={classes["form-label__checkout"]}
                htmlFor="expYear"
              >
                Exp. Year
              </label>
            </div>
            <div>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="cvv"
                placeholder="123"
              />
              <label className={classes["form-label__checkout"]} htmlFor="cvv">
                CVV
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={classes["btn-checkout"]}
        onClick={() => sendOrderHandler(order)}
      >
        Proceed order
      </button>
      <button
        type="button"
        className={classes["btn-cancel"]}
        onClick={props.onCancelCheckout}
      >
        Cancel payment
      </button>
    </form>
  );
}

export default CheckoutForm;
