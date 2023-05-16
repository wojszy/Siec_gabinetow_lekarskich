import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

import "./Checkout.css";

const ProductDisplay = (props) => (
  <section>
    <div className="product">
      <img
        src="https://media.istockphoto.com/photos/portrait-of-mature-male-doctor-wearing-white-coat-standing-in-picture-id1203995945?k=20&m=1203995945&s=612x612&w=0&h=g0_ioNezBqP0NXrR_36-A5NDHIR0nLabFFrAQVk4PhA="
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Wizyta</h3>
      <h5>{props.amount + " PLN"}</h5>
      </div>
    </div>
    <form action={`https://localhost:5001/api/payment?amount=${props.amount}&BillId=${props.billId}`} method="POST">
      <button type="submit">
        Zapłać
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");
  const location = useLocation();


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
   
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay amount ={location.state.amount} billId ={location.state.billId} />
  );
}