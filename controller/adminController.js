import db from "../config/database.js";   //since thsi is my custom js file so add.js here
import jwt from "jsonwebtoken";

export const adminLogin = (req,res)=>{

    const {email, password} = req.body;

    console.log('Email:', email, 'Password:', password);
    
    const query = 'SELECT * FROM admins WHERE email=? AND password=?';

    //databse select query response
    db.query(query, [email,password], (err,result) => {
        
        if(result.length > 0)
        {
            //JWT 
            const token = jwt.sign(
                {
                    adminId:result[0].id,
                    adminEmail:result[0].email,
                },
                process.env.JWTKEY,
                {
                    expiresIn:'1hr'
                }
            );


            res.json({
                    status:true,
                    message:'Admin Login Successfull',
                    token:token,
                    admin:result[0],
                });
        }
        else
        {
            res.json({
                    status:false,
                    message:'Invalid Login Credentials',
                    admin:{}
                });
        }
        

    });

}

