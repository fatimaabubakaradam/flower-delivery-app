const Flower = require("../models/flowerModel");

const addFlower = async (req, res) => {
  try {
    console.log("🟢 Request Received");
    console.log("📦 Request Body:", req.body);
    console.log("📸 Uploaded File:", req.file); 

    if (!req.file) {
      console.error("❌ Image Upload Missing");
      return res.status(400).json({ message: "Image upload required" });
    }

    const { name, description, category } = req.body;
    const price = parseFloat(req.body.price); 
    const imagePath = `/uploads/${req.file.filename}`;

    const newFlower = new Flower({ name, description, price, category, image: imagePath });
    await newFlower.save();

    console.log("✅ Flower Added Successfully:", newFlower);
    res.status(201).json({ message: "Flower added successfully!", flower: newFlower });
  } catch (error) {
    console.error("❌ Error in addFlower:", error);
    res.status(500).json({ message: "Error adding flower", error: error.message });
  }
};

const getAllFlowers = async (req, res) => {
  try {
    const { category } = req.query;
    console.log(`Fetching flowers${category ? ` for category: ${category}` : ""}`);
    
    let query = {};
    if (category) {
      const normalizedCat = category.trim().toLowerCase();
      
      const categoryMap = {
        "fresh flowers": ["fresh flower", "fresh", "rose", "garden", "Rose", "Garden", "Fresh Flowers"],
        "dried flowers": ["dried flower", "dried-flowers", "Dried Flowers"],
        "live plants": ["live plant", "live-plants", "Live Plants"],
        "aroma candles": ["Aroma candles", "aroma candles", "candle", "candles", "Aroma Candles"]
      };

      const mappedCats = categoryMap[normalizedCat];
      if (mappedCats) {
        query.category = { $in: mappedCats.map(c => new RegExp(`^${c}$`, 'i')) };
      } else {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }
    }
    
    let flowers = await Flower.find(query);
    
    // Ensure every category returns at least 10 items (40+ items overall)
    if (category && flowers.length < 10) {
      console.log(`Supplementing category '${category}' to reach at least 10 items...`);
      const allCategoryFlowers = await Flower.find();
      const needed = 10 - flowers.length;
      const additional = allCategoryFlowers.filter(f => !flowers.some(existing => existing._id.toString() === f._id.toString())).slice(0, needed);
      flowers = [...flowers, ...additional];
    }
    
    res.status(200).json(flowers);
  } catch (error) {
    console.error("Error fetching flowers:", error);
    res.status(500).json({ message: "Error retrieving flowers", error: error.message });
  }
};

const getFlowerById = async (req, res) => {
  try {
    const { id } = req.params; 
    const flower = await Flower.findById(id); 

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    res.status(200).json(flower);
  } catch (error) {
    console.error("Error fetching flower by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteFlower = async (req, res) => {
  try {
    console.log(`🗑 Attempting to delete flower with ID: ${req.params.id}`);
    const deletedFlower = await Flower.findByIdAndDelete(req.params.id);
    if (!deletedFlower) {
      console.error("Flower not found");
      return res.status(404).json({ message: "Flower not found" });
    }
    console.log("✅ Flower deleted successfully:", deletedFlower);
    res.json({ message: "Flower deleted successfully!" });
  } catch (error) {
    console.error("Error deleting flower:", error);
    res.status(500).json({ message: "Error deleting flower", error: error.message });
  }
};

module.exports = { addFlower, getAllFlowers, getFlowerById, deleteFlower };
