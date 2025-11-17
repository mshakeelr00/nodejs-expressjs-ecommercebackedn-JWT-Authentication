import express from "express";
import { createOrder } from "../controller/orderController.js";
import verifyToken from "../middlewear/verifyToken.js";


const routes = express.Router();

routes.post("/create", verifyToken, createOrder);

export default routes;