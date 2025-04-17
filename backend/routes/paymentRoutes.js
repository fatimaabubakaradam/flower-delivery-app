const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// POST /api/payments/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    console.warn("❌ No valid cart items provided.");
    return res.status(400).json({ error: "No valid cart items provided" });
  }

  try {
    console.log("✅ Received cart items:", cartItems);

    const line_items = cartItems.map((item) => {
      if (
        !item.name ||
        !item.imageUrl ||
        typeof item.price !== "number" ||
        isNaN(item.price)
      ) {
        console.error("❌ Invalid item format:", item);
        throw new Error("Invalid cart item format");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.imageUrl],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amount in cents
        },
        quantity: item.quantity || 1,
      };
    });

    console.log("🧾 Formatted Stripe line_items:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url:
        "https://flower-delivery-app-fontend-client.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://flower-delivery-app-fontend-client.onrender.com/Home",
    });

    console.log("✅ Stripe session created:", session.id);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("💥 Stripe session creation failed:", error.message);
    return res.status(500).json({
      message: "Failed to create checkout session",
      error: error.message,
    });
  }
});

// GET /api/payments/session/:id
router.get("/session/:id", async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

    res.status(200).json(session);
  } catch (error) {
    console.error("❌ Failed to retrieve session:", error.message);
    res.status(500).json({ error: "Failed to retrieve session details" });
  }
});


module.exports = router;
