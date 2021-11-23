import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Header from "./UI/Header";
import HeroImage from "./components/HeroImage";
import Introduction from "./components/Introduction";
import MealGrid from "./components/MealGrid";
import Modal from "./UI/Modal";
import CartProvider from "./store/CartProvider";

function App() {
  //state initialization
  const [isShown, setIsShown] = useState(false);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //function to handle data fetching
  const fetchMealsHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-meals-cbcd5-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      // console.log(response);
      const mealsData = await response.json();
      // console.log(mealsData);
      const mealsArr = Object.entries(mealsData);
      // console.log(mealsArr);
      const transformedData = mealsArr.map((meal) => {
        return {
          id: meal[0],
          dish: meal[1].dish,
          category: meal[1].category,
          cuisine: meal[1].cuisine,
          price: meal[1].price,
          imgURL: meal[1].imgURL,
        };
      });
      // console.log(transformedData);
      setMeals(transformedData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  const openModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  let content = "Found no meals";
  if (meals.length > 0) {
    content = <MealGrid meals={meals} />;
  }
  if (error) {
    content = <p className="error-text">{`${error}!!!`}</p>;
  }
  if (isLoading) {
    content = <p className="loading-text">Loading...</p>;
  }
  return (
    <CartProvider>
      {isShown && <Modal show={isShown} onCloseModal={closeModal} />}

      <HeroSection>
        <Header onOpenModal={openModal} />
        <HeroImage />
        <Introduction />
      </HeroSection>
      <section>{content}</section>
    </CartProvider>
  );
}

export default App;
