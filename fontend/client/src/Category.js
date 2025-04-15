import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Fresh from "./assets/fresh.png";
import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67faceae47d80a58e98c842b",
          "67facfb147d80a58e98c842d",
          "67fad03f47d80a58e98c842f",
          "67fad0a247d80a58e98c8431",
          "67fad16347d80a58e98c8435",
          "67fad1f647d80a58e98c8437",
          "67fad27e47d80a58e98c8439",
          "67fad2d947d80a58e98c843b",
          "67fad33b47d80a58e98c843d",
          "67fad38f47d80a58e98c843f",
        ];
        const freshFlowers = data.filter((flower) =>
          flowerIds.includes(flower._id)
        );
        setFlowers(freshFlowers);
      })
      .catch((error) => console.error("Error fetching flowers:", error));
  }, []);

  return (
    <div>
      <div className="cat-con-flower">
        <section className="category-container">
          <img src={Fresh} alt="Fresh Flowers" className="category-image" />
        </section>
        <section className="flowers-list">
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <Link
                to={`/product/${flower._id}`}
                key={flower._id}
                className="flower-card"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com'}${flower.image}`}
                  alt={flower.name}
                  className="flower-image"
                />
              </Link>
            ))
          ) : (
            <p>Loading flowers...</p>
          )}
        </section>
      </div>
      <Review />
    </div>
  );
};

export default Category;
