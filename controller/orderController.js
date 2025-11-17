import db from "../config/database.js";

export const createOrder = (req, res) => {

  const { customer_id, customer_name, customer_address, customer_zipcode, customer_email, phone, order_notes, cart } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({
      status: false,
      message: "Cart is empty.",
    });
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartJSON = JSON.stringify(cart);

  const query = `
    INSERT INTO orders 
    (
      customer_id, 
      customer_name, 
      customer_address, 
      customer_zipcode, 
      customer_email, 
      order_amount, 
      customer_phone, 
      order_notes, 
      cart_items, 
      created_at
    )

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(query, [customer_id, customer_name, customer_address, customer_zipcode, customer_email, totalAmount, phone, order_notes, cartJSON], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ status: false, message: "Database error" });
    }

    return res.json({
      status: true,
      message: "✅ Order placed successfully!",
      order_id: result.insertId,
    });
  });
};
