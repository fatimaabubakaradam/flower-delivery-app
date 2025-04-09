import React, { useState, useEffect } from "react";
import "./Product.css";
import flowercup from "./assets/cup.png";
import Review from "./review";

const Product = () => {
  const [flowers, setFlowers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Check if user is authenticated

    fetch("https://flower-delivery-app-backend.onrender.com")
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67eab1d086eedae53895d2eb",
          "67eab39686eedae53895d2ee",
          "67eab3c386eedae53895d2f0",
          "67eab3f486eedae53895d2f2",
        ];
        setFlowers(data.filter((flower) => flowerIds.includes(flower._id)));
      })
      .catch((error) => console.error("Error fetching flowers:", error));
  }, []);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please sign in to add items to the cart.");
      return;
    }

    alert("Item added to cart!");
  };

  return (
    <div className="product-container">
      <div className="pro-con-desktop">
        <section className="product-image-container">
          <img
            src={flowercup}
            alt="Beautiful Flower Arrangement"
            className="product-image"
          />
        </section>

        <section className="product-details">
          <h1 className="product-title">Rosy Delight - $100</h1>
          <p className="product-description">
            Large exceptional bouquet composed of a selection of David Austin roses.
          </p>

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
            disabled={!isAuthenticated}
          >
            ADD TO BASKET
          </button>
        </section>
      </div>

      <section className="product-flowers-list">
        <div className="product-flowers-container">
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <div key={flower._id} className="flower-item">
                <img
                  src={flower.image} 
                  alt="Flower"
                  className="product-flower-image"
                />
              </div>
            ))
          ) : (
            <p>Loading flowers...</p>
          )}
        </div>
      </section>

      <Review />
    </div>
  );
};

export default Product;
