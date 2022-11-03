import { db } from "../connect.js"
import bcrypt from "bcryptjs"


export const login =(req,res) => {

}


export const register =(req,res) => {
    const q = "SELECT * FROM user WHERE name = ?"
    db.query(q, [req.body.name], (err, data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User uussen bain")
    
    //CREATE NEW USER
      //hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)

      const q = "INSERT INTO user (`email`, `password`,`name`) VALUE (?)"

      const values = [
        req.body.email, 
        hashedPassword, 
        req.body.name]        

      db.query(q, [values], (err, data) => {
        return res.status(200).json("User created")
      });
    });
}



export const logout =(req,res) => {
    
}