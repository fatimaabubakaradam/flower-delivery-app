require("dotenv").config();
const mongoose = require("mongoose");
const Flower = require("./models/flowerModel");

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const categories = await Flower.distinct("category");
    console.log("Distinct Categories:", categories);
    
    for (const cat of categories) {
      const count = await Flower.countDocuments({ category: cat });
      console.log(`- ${cat}: ${count} flowers`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

check();
