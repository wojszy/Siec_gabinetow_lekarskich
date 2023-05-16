import React, { useState, useEffect } from "react";
import CustomButton from "../customButton/customButton";
import { Link } from "react-router-dom";
import "./PaymentResult.css";

function PaymentSuccess() {
  return (
    <div class="center">
      <h1>Płatność zakończona niepowodzeniem</h1>
      <Link to="/patient">
        <button type="submit">Wróć do ekranu głównego</button>
      </Link>
    </div>
  );
}

export default PaymentSuccess;
