import React, { useContext } from "react";
import classes from "./SummaryCard.module.css";
import CartContext from "../store/cart-context";
function SummaryCard(props) {
  const cartCtx = useContext(CartContext);

  return (
    <div className={classes["summary-card"]}>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.dish}>
            <div>
              <h3>{item.dish}</h3>
              <div className={classes["price-summary"]}>
                <span className={classes.price}>{`$${item.price.toFixed(
                  2
                )}`}</span>
                <span className={classes.amount}>x {item.amount}</span>
              </div>
            </div>

            <div className={classes.actions}>
              <button onClick={props.onRemove.bind(null, item.id)}>-</button>
              <button onClick={props.onAdd.bind(null, item)}>+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SummaryCard;
