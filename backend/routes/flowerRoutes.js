const express = require("express");
const upload = require("../config/multerConfig"); 
const { addFlower, getAllFlowers, getFlowerById, deleteFlower } = require("../controllers/flowerController"); // Ensure `getFlowerById` is imported

const router = express.Router();

// Get all flowers
router.get("/", getAllFlowers);

// Get a flower by ID (Ensure `getFlowerById` is correctly imported)
router.get("/:id", getFlowerById);

// Add a new flower
router.post("/", upload.single("photo"), addFlower);

// Delete a flower by ID
router.delete("/:id", deleteFlower);

module.exports = router;
