const express = require("express");
const upload = require("../config/multerConfig"); 
const { addFlower, getAllFlowers, getFlowerById, deleteFlower } = require("../controllers/flowerController"); 

const router = express.Router();

router.get("/", getAllFlowers);

router.get("/:id", getFlowerById);

router.post("/", upload.single("photo"), addFlower);

router.delete("/:id", deleteFlower);

module.exports = router;
