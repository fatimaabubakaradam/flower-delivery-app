const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;  

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "No cart items provided" });
  }

  console.log("Received cart items:", cartItems);

  const line_items = cartItems.map((item) => {
    if (!item.imageUrl || !item.price || isNaN(item.price)) {
      console.error("Invalid data in cart item:", item);
      throw new Error("Invalid cart item data (missing imageUrl or price)");
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.imageUrl],  
        },
        unit_amount: Math.round(item.price * 100),  
      },
      quantity: item.quantity || 1,  
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],  
      line_items,  
      mode: "payment",  
      success_url: "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",  
      cancel_url: "http://localhost:5173/cart",  
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    res.status(500).json({ message: "Failed to create checkout session", error: error.message });
  }
});

module.exports = router;
