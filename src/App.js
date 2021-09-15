import React, { useState } from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Header from "./UI/Header";
import Backdrop from "./components/Backdrop";
import Introduction from "./components/Introduction";
import MealGrid from "./components/MealGrid";
import CartModal from "./components/CartModal";
import CartProvider from "./store/CartProvider";
const meals = [
  {
    id: 1,
    dish: "Japanese Gyozas",
    cuisine: "Japanese",
    category: "starter",
    price: 12.49,
    imageUrl: "./images/japanese-gyozas.jpg",
  },
  {
    id: 2,
    dish: "Avocado Sandwich",
    cuisine: "International",
    category: "salads",
    price: 9.45,
  },
  {
    id: 3,
    dish: "Surf & Turf Burger",
    cuisine: "American",
    category: "dinner",
    price: 12.9,
  },
  {
    id: 4,
    dish: "Pizza a la Genovese",
    cuisine: "Italian",
    category: "pizza",
    price: 18.5,
  },
  {
    id: 5,
    dish: "Butter chicken",
    cuisine: "Indian",
    category: "dinner",
    price: 16.49,
  },
  {
    id: 6,
    dish: "Chocolate Brownie",
    cuisine: "American",
    category: "dessert",
    price: 3.5,
  },
];

function App() {
  //state initialization
  const [isShown, setIsShown] = useState(false);

  const openModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  return (
    <CartProvider>
      {isShown && <CartModal onCloseModal={closeModal} />}

      <HeroSection>
        <Header onOpenModal={openModal} />
        <Backdrop />
        <Introduction />
      </HeroSection>
      {/* <AddToCart /> */}
      <MealGrid meals={meals} />
    </CartProvider>
  );
}

export default App;
