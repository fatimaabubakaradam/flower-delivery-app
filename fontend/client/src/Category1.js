
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Dry from "./assets/dried.png";

import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67fb1a7347d80a58e98c8525",
          "67fb1bce47d80a58e98c8535",
          "67fb21ad47d80a58e98c854d",
          "67fb21eb47d80a58e98c8550",
          "67fb1ee447d80a58e98c853f",
"67fb223947d80a58e98c8553",
"67fade1847d80a58e98c8501",
"67fafc5947d80a58e98c850b",
"67fb1f5947d80a58e98c8542",
"67fb1f5947d80a58e98c8542",
"67fb1f5947d80a58e98c8542",
"67fb1a7347d80a58e98c8525",
"67fb1bce47d80a58e98c8535",

"67fb1e9647d80a58e98c853c",



          
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
  <img src={Dry} alt="Fresh Flowers" className="category-image" />
  <div className="category-text">Dried Flowers</div>
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





