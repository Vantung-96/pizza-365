const express = require('express');

// import Drink router
const { createDrink, getAllDrink, getDrinkById, updateDrinkById, deleteDrinkById } = require("../controllers/drinkController");

const router = express.Router();

router.post("/drinks", createDrink);

router.get("/drinks", getAllDrink);
router.get("/drinks/:drinkId", getDrinkById);
router.put("/drinks/:drinkId", updateDrinkById)
router.delete("/drinks/:drinkId", deleteDrinkById)

module.exports = router;