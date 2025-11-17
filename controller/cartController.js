import db from "../config/database.js";   //since thsi is my custom js file so add.js here

export const addCartItems = (req, res) => {
    //const { productid, quantity } = req.body;
    //const userid = '1';

    //const userid = req.user.id; 

    const { product_id, quantity, user_id } = req.body;

    // You can either use req.user.id or user_id from body
    const userid = req.user?.id || user_id;


    if (!productid || !quantity) {
        return res.status(400).json({ status: false, message: "Product ID and quantity are required!" });
    }

    const query = "INSERT INTO cart (product_id, quantity, user_id, created_at) VALUES(?, ?, ?, NOW())";

    db.query(query, [productid, quantity, userid], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ status: false, message: "Database error" });
        }

        return res.json({
            status: true,
            message: "Product Added in Cart Successfully",
            cartid: result.insertId,
        });
    });
};


//get cart items
export const getCartItems = (req,res) => {

    const userid = req.user.id;
    //const userid = 1;

    //JOIN query
    const query = "SELECT c.product_id, c.quantity, p.id, p.image, p.price, p.stock FROM cart c INNER JOIN products p ON c.product_id = p.id WHERE c.user_id=?";

    db.query(query, [userid], (err, result) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).json({ status: false, message: "Database error" });
        }

        return res.json({
            status: true,
            message: "Cart List Successfully",
            cart: result,
        });
    });


};