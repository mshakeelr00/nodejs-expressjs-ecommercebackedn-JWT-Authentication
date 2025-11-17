import db from "../config/database.js";   //since thsi is my custom js file so add.js here

//get all products function
export const getProducts = (req,res)=>{

    //databse select query response
    db.query('SELECT * FROM products WHERE deleted_at IS NULL', (err,result) => {
        
        if(err)
        {
            res.send('Something went wrong!!');
        }
        else
        {
            res.json(
                {
                    status:true,
                    message:"All products are returned",
                    products:result
                }
            );
        }
        

    });

}


// Get product by id
// Get a single product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM products WHERE id = ? AND deleted_at IS NULL",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Send the first (and only) product record
      res.json({
        status: true,
        message: "Product found",
        products: result[0],
      });
    }
  );
};

//add product api
export const addProducts = (req,res)=>{
    
    const { name, description, price, stock, sku, image } = req.body;

    const insertQuery = "INSERT INTO products (name,description,price,stock,sku,image,created_at) values (?,?,?,?,?,?, NOW())";

    //databse select query response
    db.query(insertQuery,[name, description, price, stock, sku, image], (err,result) => {
        if(err)
        {

            res.json({
                status:false,
                message:"DB Error !!",
            });
        }
        else
        {
            res.json(
                {
                    status:true,
                    message:"Product added successfully !"
                }
            );
        }
        
    });

}


//Edit/update product api
export const updateProducts = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, image } = req.body;

  const updateQuery = `
    UPDATE products 
    SET name = ?, description = ?, price = ?, stock = ?, image = ?, updated_at = NOW()
    WHERE id = ?
  `;

  db.query(updateQuery, [name, description, price, stock, image, id], (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.json({
        status: false,
        message: "DB Error !!",
      });
    }

    if (result.affectedRows === 0) {
      return res.json({
        status: false,
        message: "No product found with this ID.",
      });
    }

    res.json({
      status: true,
      message: "Product updated successfully!",
    });
  });
};



//delete/soft delete product API
export const sdProduct = (req, res) => {
  const { id } = req.body; // receiving from DELETE body

  if (!id) {
    return res.status(400).json({ status: false, message: "Product ID is required" });
  }

  const query = `
    UPDATE products 
    SET deleted_at = NOW(), updated_at = NOW()
    WHERE id = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ status: false, message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    res.json({ status: true, message: "Product soft deleted successfully" });
  });
};


//export default getProducts;