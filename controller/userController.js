import db from "../config/database.js";
import jwt from "jsonwebtoken";

//User registration function
export const userRegister = (req,res)=>{
    
    const { name, email, password, dob, gender, phone, address } = req.body;

    const dateTime = new Date(); //we have builtin fucntion to set the current date and time stamp else we can SQL NOW() fucntion direct in query

    const checkEmail = "SELECT * FROM users WHERE email=?";

    db.query(checkEmail, [email], (err, result) => {
   
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ status: false, message: "Database error" });
        }

        if (result.length > 0) {          
            return res.json({ status: false, message: "Email already exists" });
        }



        const insertQuery = "INSERT INTO users (name, email, `password`, dob, gender, phone_number, address, created_at) values (?,?,?,?,?,?,?, NOW())";

        db.query(insertQuery, [name, email, password, dob, gender, phone, address], (errr, results) => {
            if (errr) {
                console.error("Error inserting user:", err);
                return res.status(500).json({ error: "Database error during insertion" });
            }

            console.log("User registered successfully:", email);
            
            return res.json({
                status: true,
                message: "User registered successfully"
            });

        });



    });

}


//user login fuction
export const userlogin = (req, res) => {
 
    const { email, password } = req.body;
 
    const query = "SELECT * FROM users WHERE email=? AND `password`=?"
 
    db.query(
        query,
        [email, password],
        (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database error" });
            }

            if (result.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign(
                {
                  id: result[0].id,
                  email: result[0].email   
                },
                process.env.JWTKEY,
                {
                    expiresIn: '10h'
                }
            );


            res.json(
                { 
                    status:true,
                    message: "Login successful" ,
                    token: token,
                    user: result[0]
                }
            );
        }
    );
}

