import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import classes from "./CheckoutForm.module.css";
import amex from "../images/icons/icons8-american-express.svg";
import dinersClub from "../images/icons/icons8-diners-club.svg";
import mastercard from "../images/icons/icons8-mastercard.svg";
import visa from "../images/icons/icons8-visa.svg";

function CheckoutForm(props) {
  //To date fnc
  // const toDate = (dateStr) => {
  //   const [month, year] = dateStr.split("/");
  //   return new Date(month - 1, year);
  // };

  // const today = new Date();

  // const schema = object({
  //   birthday: Yup.string().transform(toDate).max(today),
  // });

  // const isValid = schema.validateSync({
  //   birthday: "2021-02-02",
  // });
  // console.log(isValid);

  const creditCardRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  const testExpDate = (expDate) => {
    if (!expDate) return false;
    const today = new Date();
    const curMonth = today.getMonth() + 1;
    const curYear = today.getFullYear().toString().substr(-2);

    const [expMonth, expYear] = expDate.split("/");

    if (+expYear < +curYear) {
      return false;
    } else if (+expMonth < curMonth && +expYear <= +curYear) {
      return false;
    }
    return true;
  };
  const formik = useFormik({
    initialValues: {
      fname: "",
      email: "",
      address: "",
      city: "",
      postcode: "",
      nameOnCard: "",
      creditCardNum: "",
      expDate: "",
      cvv: "",
      sameAsBilling: false,
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      postcode: Yup.string()
        .min(3, "Must be at least 3 number!")
        .max(5, "Must be 5 number-code!")
        .required("Required"),
      nameOnCard: Yup.string().required("Required"),
      creditCardNum: Yup.string()
        .matches(creditCardRegex, "Invalid credit card numbers")
        .required("Required"),
      expDate: Yup.string()
        .max(5, "Not a valid expiration date!")
        .matches(
          /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
          "Not a valid expiration date."
        )
        .test("test-expiration-date", "Expiration Date has past!", testExpDate)
        .required("Required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, "Not a valid cvv!")
        .required("Required"),
    }),
    onSubmit: (values, { setSubmitting, resetForm, setStatus }) => {
      setTimeout(() => {
        console.log(values);
        props.onConfirm(formik);

        setSubmitting(false);
        if (formik.isValid)
          setStatus({
            sent: true,
            msg: "Order has been successfully sent! Thank you for choosing ReactMeals!",
          });
        resetForm();
      }, 400);
    },
  });

  // let feedbackContent;
  // if (formik.isSubmitting) {
  //   feedbackContent = (
  //     <div className={classes["form-checkout__feedback"]}>
  //       <p className={classes["message-text"]}>
  //         Your order is being submitted...
  //       </p>
  //     </div>
  //   );
  // }
  // if (formik.status) {
  //   feedbackContent = (
  //     <div className={classes["form-checkout__feedback"]}>
  //       <p className={classes["message-text"]}>{formik.status.msg}</p>
  //       <button
  //         className={classes["btn-clear"]}
  //         type="button"
  //         onClick={clearCartHandler}
  //       >
  //         Clear cart
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit} className={classes["form-checkout"]}>
        <div className={classes["form-container"]}>
          <div className={classes["form-group"]}>
            <h3>Billing Address</h3>
            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="fname"
                placeholder="Jane M. Doe"
                {...formik.getFieldProps("fname")}
              />

              <label
                className={classes["form-label__checkout"]}
                htmlFor="fname"
              >
                Full name
              </label>
              {formik.touched.fname && formik.errors.fname && (
                <span className={classes["error-text"]}>
                  {formik.errors.fname}
                </span>
              )}
            </div>

            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="email"
                placeholder="jane@mail.com"
                {...formik.getFieldProps("email")}
              />

              <label
                className={classes["form-label__checkout"]}
                htmlFor="email"
              >
                Email
              </label>
              {formik.touched.email && formik.errors.email && (
                <span className={classes["error-text"]}>
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="address"
                placeholder="somewhere abc"
                {...formik.getFieldProps("address")}
              />

              <label
                className={classes["form-label__checkout"]}
                htmlFor="address"
              >
                Address
              </label>
              {formik.touched.address && formik.errors.address && (
                <span className={classes["error-text"]}>
                  {formik.errors.address}
                </span>
              )}
            </div>

            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="city"
                placeholder="Helsinki"
                {...formik.getFieldProps("city")}
              />

              <label className={classes["form-label__checkout"]} htmlFor="city">
                City
              </label>
              {formik.touched.city && formik.errors.city && (
                <span className={classes["error-text"]}>
                  {formik.errors.city}
                </span>
              )}
            </div>

            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="postcode"
                placeholder="00010"
                {...formik.getFieldProps("postcode")}
              />

              <label
                className={classes["form-label__checkout"]}
                htmlFor="postcode"
              >
                Post code
              </label>
              {formik.touched.postcode && formik.errors.postcode && (
                <span className={classes["error-text"]}>
                  {formik.errors.postcode}
                </span>
              )}
            </div>

            <label>
              <input
                type="checkbox"
                name="sameAsBilling"
                {...formik.getFieldProps("sameAsBilling")}
              />
              Shipping address same as billing
            </label>
          </div>
          <div className={classes["form-group"]}>
            <h3>Payment</h3>
            <div className={classes["cards-container"]}>
              <label htmlFor="acceptedCard">Accepted Card</label>
              <ul className={classes["card-list"]}>
                <li>
                  <img src={amex} alt="amex" />
                </li>
                <li>
                  {" "}
                  <img src={dinersClub} alt="dinersclub" />
                </li>
                <li>
                  {" "}
                  <img src={mastercard} alt="mastercard" />
                </li>
                <li>
                  <img src={visa} alt="visa" />
                </li>
              </ul>
            </div>
            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="nameOnCard"
                placeholder="Jane M. Doe"
                {...formik.getFieldProps("nameOnCard")}
              />

              <label
                className={classes["form-label__checkout"]}
                htmlFor="nameOnCard"
              >
                Name on Card
              </label>
              {formik.touched.nameOnCard && formik.errors.nameOnCard && (
                <span className={classes["error-text"]}>
                  {formik.errors.nameOnCard}
                </span>
              )}
            </div>

            <div className={classes["form-field"]}>
              <input
                className={classes["form-control__checkout"]}
                type="text"
                name="creditCardNum"
                placeholder="1111-2222-333-444"
                {...formik.getFieldProps("creditCardNum")}
              />

              <label
                className={classes["form-label__checkout"]}
                htmlFor="creditCardNum"
              >
                Credit Card Number
              </label>
              {formik.touched.creditCardNum && formik.errors.creditCardNum && (
                <span className={classes["error-text"]}>
                  {formik.errors.creditCardNum}
                </span>
              )}
            </div>

            <div className={classes["card-date"]}>
              <div className={classes["form-field"]}>
                <input
                  className={classes["form-control__checkout"]}
                  type="text"
                  name="expDate"
                  placeholder="MM/YY"
                  {...formik.getFieldProps("expDate")}
                />

                <label
                  className={classes["form-label__checkout"]}
                  htmlFor="expDate"
                >
                  MM/YY
                </label>
                {formik.touched.expDate && formik.errors.expDate && (
                  <span className={classes["error-text"]}>
                    {formik.errors.expDate}
                  </span>
                )}
              </div>

              <div className={classes["form-field"]}>
                <input
                  className={classes["form-control__checkout"]}
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  {...formik.getFieldProps("cvv")}
                />

                <label
                  className={classes["form-label__checkout"]}
                  htmlFor="cvv"
                >
                  CVV/CCV
                </label>
                {formik.touched.cvv && formik.errors.cvv && (
                  <span className={classes["error-text"]}>
                    {formik.errors.cvv}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={classes["btn-checkout"]}
          onClick={props.onConfirm}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Proceed order
        </button>
        <button
          type="button"
          className={classes["btn-cancel"]}
          onClick={props.onCancelCheckout}
        >
          Cancel payment
        </button>
      </form>
    </Fragment>
  );
}

export default CheckoutForm;
