import jwt from "jsonwebtoken";

function verifyToken(req, res, next)
{

    //get header authroization vlaue passed in postman
    const authheader = req.headers.authorization;

    //if error is occured the simple send message
    if(!authheader)
    {
        res.status(401).json({
            message:"Token Missing !"
        });
    }else{

        //break the Authrization sting and get token at first index 
        const token = authheader.split(' ')[1];

        //error handling if token is verifed or not
        try{
            // token we are getting and the string we have used for vrfication in adminController
            const data = jwt.verify(token, process.env.JWTKEY);

            // Attach user info to req.user
            req.user = data;

            // this fucntion will tell the system if the received token is verified or not untill verified system will nto proceed
            next();

        }catch(e){
             res.status(401).json({
                message:"Token Not Verified !"
            });
        }

    }

} 

export default verifyToken;