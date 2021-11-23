//useReducer to reduce the form input values
import { useReducer } from "react";
//initiate the initial state of each input
const initialInputState = {
  value: "",
  isTouched: false,
};

// the reducer function
const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return { value: "", isTouched: false };
    default:
      throw new Error("Something went wrong!");
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = inputState.isTouched && !valueIsValid;

  //Input handlers in different cases
  const inputChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value });
  };
  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };
  const resetValue = () => {
    dispatch({ type: "RESET" });
  };

  //useInput hook return an object which has values and methods
  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    resetValue,
  };
};
export default useInput;
