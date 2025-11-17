import { Router } from "express";

import {userRegister, userlogin} from '../controller/userController.js';

//import router object
const routes = Router();

routes.post("/userregister", userRegister);        //call the path of userregister
routes.post("/userlogin", userlogin);              //call the path of userlogin function in controlelr 



export default routes;