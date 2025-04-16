import React, { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    // Clear cart from localStorage on success
    localStorage.removeItem("cartItems");

    // Redirect home after a delay
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }, []);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Redirecting you to the home page...</p>
    </div>
  );
};

export default PaymentSuccess;
