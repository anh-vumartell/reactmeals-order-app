import React, { useReducer } from "react";

//In this component we can add all the logic related to managing context data
//How to use CartContext-component: wrap it around those components where the cart data is needed
import CartContext from "./cart-context";

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  //WHEN ADDING AN ITEM
  if (action.type === "ADD_ITEM") {
    //Find index of action.item
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //Access the existingItem with index
    const existingCartItem = state.items[existingItemIndex];

    let updatedItems;

    if (existingCartItem) {
      //using spread operator not to mutate the current array
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      //item is added for the first time, we concat it to the current array
      updatedItems = state.items.concat(action.item);
      // console.log(updatedItems);
    }
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  //WHEN REMOVING AN ITEM
  if (action.type === "REMOVE_ITEM") {
    //Step 1: Find the index of the item we want to remove: findIndex()
    const indexOfCurrentItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log(indexOfCurrentItem);
    //Step 2: Access the item with the above index
    const currentItem = state.items[indexOfCurrentItem];
    //Step 3: Calculate the total amount after decreasing
    const updatedTotalAmount = state.totalAmount - currentItem.price;

    let updatedItems;

    //Step 4: Check currentItem.amount: 2 scenarios
    //current.amount === 1 , remove the item by using filter()
    //current.amount > 1, decrease the amount by 1
    if (currentItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    if (currentItem.amount > 1) {
      const updatedCurrentItem = {
        ...currentItem,
        amount: currentItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[indexOfCurrentItem] = updatedCurrentItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
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
  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
