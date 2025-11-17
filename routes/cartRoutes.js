import express from "express";
import verifyToken from "../middlewear/verifyToken.js";
import { addCartItems , getCartItems } from "../controller/cartController.js";

const router = express.Router();

// ✅ Add item to cart
router.post("/add", verifyToken, addCartItems);
router.post("/getcartitems", verifyToken, getCartItems);


export default router;