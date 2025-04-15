import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    if (sessionId) {
      // Clean the URL
      const url = new URL(window.location);
      url.searchParams.delete("session_id");
      window.history.replaceState({}, document.title, url.pathname);

      // Set message
      setMessage("🎉 Payment Successful! Thank you for your purchase.");
    }
  }, [sessionId]);

  return (
    <div className="success-page">
      <h1>{message}</h1>
    </div>
  );
};

export default PaymentSuccess;


// Card number: 4242 4242 4242 4242

// Expiration: 12/34

// CVC: 123

// Name & email: anything works