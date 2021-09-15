import React, { useReducer } from "react";

//In this component we can add all the logic related to managing context data
//How to use CartContext-component: wrap it around those components where the cart data is needed
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = state.items.concat(action.item);
    console.log(updatedItems);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    console.log(updatedTotalAmount);
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};
//A CartProvider Component
function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
