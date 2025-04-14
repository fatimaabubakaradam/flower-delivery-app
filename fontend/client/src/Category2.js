// import Live from "./assets/live.png";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Live from "./assets/live.png";

import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67fd5750c037fa1d857d9586",
          "67fd57a0c037fa1d857d9589",
          "67fd57dec037fa1d857d958c",
          "67fd5822c037fa1d857d958f",
          "67fd5866c037fa1d857d9592",
          "67fd58b2c037fa1d857d9595",
          "67fd58e6c037fa1d857d9598",
          "67fd5943c037fa1d857d959c",
          "67fd598ac037fa1d857d959f",
          "67fd59f9c037fa1d857d95a4",
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
          <img src={Live} alt="Fresh Flowers" className="category-image" />
          <div className="category-text">Live Plants</div>

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
