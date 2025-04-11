const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  // Use Stripe secret key from environment variable

// POST request to create a Stripe checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;  // Extract cartItems from request body

  // Ensure cartItems is not empty and is valid
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "No cart items provided" });
  }

  // Log cart items to debug incoming request
  console.log("Received cart items:", cartItems);

  // Map cart items to line_items for Stripe checkout session
  const line_items = cartItems.map((item) => {
    // Ensure imageUrl is valid and price is a number
    if (!item.imageUrl || !item.price || isNaN(item.price)) {
      console.error("Invalid data in cart item:", item);
      throw new Error("Invalid cart item data (missing imageUrl or price)");
    }

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.imageUrl],  // Ensure this is a valid URL
        },
        unit_amount: Math.round(item.price * 100),  // Stripe requires price in cents
      },
      quantity: item.quantity || 1,  // Default to 1 quantity per item
    };
  });

  try {
    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],  // Only card payments
      line_items,  // Line items (cart items)
      mode: "payment",  
      success_url: "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",  
      cancel_url: "http://localhost:5173/cart",  
    });

    // Respond with the URL for the checkout session
    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    // Send a detailed error message to help debug
    res.status(500).json({ message: "Failed to create checkout session", error: error.message });
  }
});

module.exports = router;
