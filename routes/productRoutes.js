import { Router } from "express";
import {getProducts, getProductById, addProducts, updateProducts, sdProduct} from '../controller/productController.js';
import verifyToken from "../middlewear/verifyToken.js";

//import router object
const routes = Router();

routes.get("/", getProducts);                  //call the path of getproducts all
routes.get("/:id", getProductById); //get one product  by id
routes.get("/detail/:id", getProductById);
routes.post("/addproducts", verifyToken, addProducts);      // add products   
routes.put("/updateproducts/:id", verifyToken, updateProducts);      // update all product info
routes.delete("/deleteproducts", verifyToken, sdProduct);      // delete products


export default routes;