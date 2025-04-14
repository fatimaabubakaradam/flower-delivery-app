// import Aroma from "./assets/aroma.png";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Aroma from "./assets/aroma.png";

import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67fd5aa9c037fa1d857d95ba",
          "67fd5e3fc037fa1d857d95cc",
          "67fd5b2bc037fa1d857d95be",
          "67fd5b72c037fa1d857d95c0",
          "67fd5b9fc037fa1d857d95c2",
          "67fd5c8fc037fa1d857d95c4",
          "67fd5eabc037fa1d857d95d0",
          "67fd5ed0c037fa1d857d95d3",
          "67fd5effc037fa1d857d95d6",
          "67fd5fb6c037fa1d857d95dc",
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
          <img src={Aroma} alt="Fresh Flowers" className="category-image" />
          <div className="category-text">Aroma Candles</div>

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
                  src={`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}${flower.image}`}
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
