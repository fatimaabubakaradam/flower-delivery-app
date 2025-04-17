import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetch(`https://flower-delivery-app-backend.onrender.com/api/payments/session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          console.log("Payment session:", data);
        })
        .catch((err) => {
          console.error("Failed to fetch session:", err);
        });
    }
  }, [sessionId]);

  return (
    <div className="success-container">
      <h1>🎉 Payment Successful!</h1>
      {sessionData ? (
        <div>
          <p>Thank you, your payment of <strong>${(sessionData.amount_total / 100).toFixed(2)}</strong> was successful.</p>
          <p>Transaction ID: {sessionData.payment_intent}</p>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
