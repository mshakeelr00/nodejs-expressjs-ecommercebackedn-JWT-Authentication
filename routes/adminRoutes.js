import { Router } from "express";
import {adminLogin} from '../controller/adminController.js';

//import router object
const routes = Router();

routes.post("/admin-login", adminLogin);        //call the path of getproducts


export default routes;