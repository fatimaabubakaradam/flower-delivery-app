const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  // Use Stripe secret key from environment variable

// POST request to create a Stripe checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;  // Extract cartItems from request body

  // Map cart items to line_items for Stripe checkout session
  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [item.imageUrl],  // Optionally include an image URL for the product
      },
      unit_amount: Math.round(item.price * 100),  // Stripe requires price in cents
    },
    quantity: 1,  // Default to 1 quantity per item
  }));

  try {
    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],  // Only card payments
      line_items,  // Line items (cart items)
      mode: "payment",  
      success_url: "http://localhost:5173/payment-success",  
      cancel_url: "http://localhost:5173/cart",  
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
});

module.exports = router;
