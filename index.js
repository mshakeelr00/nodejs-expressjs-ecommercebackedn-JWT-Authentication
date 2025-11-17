//import express
import express from 'express';
import cors from "cors";        //cors package for cross domain scripting
import 'dotenv/config';   //dotenv package for .env file

const app = express();

const PORT = process.env.PORT;  //getting PORT value from env


app.use(express.json());
app.use(cors()); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


//import product router
import productRouter from './routes/productRoutes.js';

//import user router
import userRouter from './routes/userRoutes.js';

//import admin router
import adminRouter from './routes/adminRoutes.js';

//import orders
import orderRoutes from "./routes/orderRoutes.js";

//cart
import cartRoutes from './routes/cartRoutes.js';

//calling product contorller
app.use('/api/product', productRouter);   

//calling user contorller
app.use('/api/user', userRouter);

//admin login router
app.use('/api/admin', adminRouter);

//order routes
app.use("/api/order", orderRoutes);

//call cart routes
app.use("/api/cart", cartRoutes); 

app.listen(PORT, () => console.log('This is my first structress express js backend server:' + PORT));