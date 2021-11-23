import React from "react";
//Create the Cart Context which is use update the cart badge, the cart content and cart addition
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
