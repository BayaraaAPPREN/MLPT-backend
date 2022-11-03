import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


export const login =(req,res) => {

  const q = "SELECT * FROM users WHERE email = ?"
  
  db.query(q, [req.body.email], (err, data)=> {
    if(err) return res.status(500).json(err);
    if(data.length === 0) return res.status(400).json("User not found");

    const checkedPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if(!checkedPassword) return res.status(400).json("Wrong password or email")
    const token = jwt.sign({id:data[0].id}, "secret key")

    const {password, ...others} = data[0];

    res.cookie("accessToken", token,{
      httpOnly: true
    })
    .status(200)
    .json(others);
  });
}

// export const register = (req, res) => {
//   //CHECK USER IF EXISTS

//   const q = "SELECT * FROM user WHERE email = ?";

//   db.query(q, [req.body.email], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length) return res.status(409).json("User already exists!");
//     //CREATE A NEW USER
//     //Hash the password
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt);

//     const q =
//       "INSERT INTO user (`name`,`email`,`password`) VALUE (?)";
//     const values = [
//       req.body.name,
//       req.body.email,
//       hashedPassword
//     ];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("User has been created.");
//     });
//   });
// };


export const register =(req,res) => {
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, [req.body.email], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("user email already exist")
    
    //CREATE NEW USER
      //hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)

      const q = "INSERT INTO users (`email`, `password`,`name`) VALUE (?)"

      const values = [
        req.body.email, 
        hashedPassword, 
        req.body.name]        

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User created")
      });
    });
}



export const logout =(req,res) => {
    res.clearCookie("accessToken",{
      secure:true,
      sameSite: "none"
    }).status(200).json("User loged out")
}