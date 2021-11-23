import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Cart from "../components/Cart";
import Overlay from "./Overlay";

const portalElement = document.getElementById("overlay");
function Modal(props) {
  // const cssClass = ["modal", props.show ? "modalOpen" : "modalClose"];
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Cart onCloseModal={props.onCloseModal} />,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
