const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: "No valid cart items provided" });
  }

  try {
    console.log("Received cart items:", cartItems);

    const line_items = cartItems.map((item) => {
      if (
        !item.name ||
        !item.imageUrl ||
        typeof item.price !== "number" ||
        isNaN(item.price)
      ) {
        console.error("Invalid item format:", item);
        throw new Error("Invalid cart item format");
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
    });

    console.log("Checkout session created:", session.id);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation failed:", error.message);
    return res.status(500).json({
      message: "Failed to create checkout session",
      error: error.message,
    });
  }
});

module.exports = router;
