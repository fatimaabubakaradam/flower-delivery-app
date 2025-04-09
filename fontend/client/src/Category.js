import React, { useState, useEffect } from "react";
import "./Category.css";
import Fresh from "./assets/fresh.png";
import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    // Get the API URL from environment variables (set in .env files)
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Fallback to localhost for development

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67e981b43ce603cc72640b52",
          "67e98ab83ce603cc72640b88",
          "67ea0898097e879bb235e75e",
          "67ea08f9097e879bb235e762",
          "67ea092f097e879bb235e764",
          "67ea096f097e879bb235e766",
          "67ea09a6097e879bb235e768",
          "67ea09e7097e879bb235e76a",
          "67ea0a16097e879bb235e76c",
          "67ea0a5b097e879bb235e76e",
        ];
        const freshFlowers = data.filter((flower) => flowerIds.includes(flower._id));
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
        <section className="blank-card"></section>
        <section className="flowers-list">
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <div key={flower._id} className="flower-card">
                {/* Assuming flower.image contains a relative path */}
                <img
                  src={`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}${flower.image}`}
                  alt={flower.name}
                  className="flower-image"
                />
              </div>
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
