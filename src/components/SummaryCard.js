import React, { useContext } from "react";
import classes from "./SummaryCard.module.css";
import CartContext from "../store/cart-context";
function SummaryCard(props) {
  const cartCtx = useContext(CartContext);
  return (
    <div className={classes["summary-card"]}>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            <div>
              <h3>{item.dish}</h3>
              <div className={classes["price-summary"]}>
                <span className={classes.price}>${item.price}</span>
                <span className={classes.amount}>x {item.amount}</span>
              </div>
            </div>

            <div className={classes.actions}>
              <button>-</button>
              <button>+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryCard;
