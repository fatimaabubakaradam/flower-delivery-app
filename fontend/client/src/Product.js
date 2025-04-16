import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";
import Review from "./review";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    setIsAuthenticated(!!token);

    const apiUrl = process.env.REACT_APP_API_URL || "https://flower-delivery-app-backend.onrender.com";

    fetch(`${apiUrl}/api/flowers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFlower({
          ...data,
          imageUrl: `${apiUrl}${data.image}`,
        });
      })
      .catch((error) => console.error("Error fetching flower:", error));
  }, [id]);

  const handleAddToCart = () => {
    console.log("Add to Cart clicked");
    
    if (!isAuthenticated) {
      alert("Please sign in to add items to the cart.");
      return;
    }

    if (!flower) {
      alert("Product data not loaded yet.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCart = [...existingCart, { ...flower, quantity }];

    console.log("Existing cart:", existingCart);
    console.log("Adding item:", { ...flower, quantity });

    localStorage.setItem("cartItems", JSON.stringify(newCart));

    alert("Item added to cart!");

    // Optionally delay navigation slightly
    setTimeout(() => navigate("/cart"), 300);
  };

  return (
    <div className="product-container">
      {flower ? (
        <div className="pro-con-desktop">
          <section className="product-image-container">
            <img
              src={flower.imageUrl}
              alt={flower.name}
              className="product-image"
            />
          </section>

          <section className="product-details">
            <h1 className="product-title">{flower.name} - ${flower.price}</h1>
            <p className="product-description">{flower.description}</p>

            <div className="quantity-section">
              <p>Quantity</p>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="quantity-input"
                />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className="add-to-basket"
              onClick={handleAddToCart}
              // Temporarily disable this line for testing if needed
              // disabled={!isAuthenticated}
            >
              ADD TO BASKET
            </button>
          </section>
        </div>
      ) : (
        <p>Loading flower...</p>
      )}

      <Review />
    </div>
  );
};

export default Product;
