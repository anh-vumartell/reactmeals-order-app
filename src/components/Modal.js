import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Cart from "./Cart";
import Overlay from "./Overlay";
const portalElement = document.getElementById("overlay");
function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Overlay onCloseModal={props.onCloseModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Cart isVisible={props.isVisible} onCloseModal={props.onCloseModal} />,
        portalElement
      )}
    </Fragment>
  );
}

export default Modal;
