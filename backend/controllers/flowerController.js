const Flower = require("../models/flowerModel");

// Function to add a flower
const addFlower = async (req, res) => {
  try {
    console.log("🟢 Request Received");
    console.log("📦 Request Body:", req.body);
    console.log("📸 Uploaded File:", req.file); // Log the uploaded file

    if (!req.file) {
      console.error("❌ Image Upload Missing");
      return res.status(400).json({ message: "Image upload required" });
    }

    const { name, description, category } = req.body;
    const price = parseFloat(req.body.price); // Ensure price is a number
    const imagePath = `/uploads/${req.file.filename}`;

    // Save flower to MongoDB
    const newFlower = new Flower({ name, description, price, category, image: imagePath });
    await newFlower.save();

    console.log("✅ Flower Added Successfully:", newFlower);
    res.status(201).json({ message: "Flower added successfully!", flower: newFlower });
  } catch (error) {
    console.error("❌ Error in addFlower:", error);
    res.status(500).json({ message: "Error adding flower", error: error.message });
  }
};

// Function to get all flowers
const getAllFlowers = async (req, res) => {
  try {
    console.log("Fetching all flowers...");
    const flowers = await Flower.find();
    res.status(200).json(flowers);
  } catch (error) {
    console.error("Error fetching flowers:", error);
    res.status(500).json({ message: "Error retrieving flowers", error: error.message });
  }
};

// Function to get a single flower by ID
const getFlowerById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL
    const flower = await Flower.findById(id); // Find flower by ID

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    res.status(200).json(flower);
  } catch (error) {
    console.error("Error fetching flower by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete a flower
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

// Export all functions (Ensure `getFlowerById` is included)
module.exports = { addFlower, getAllFlowers, getFlowerById, deleteFlower };
