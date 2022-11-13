import nodemailer from "nodemailer"
import {checkEmail, createAddEmail} from "../query/email/index.js"
import db from "../db.js";


export const SentEmail = (req, res) => {

    db.query(checkEmail, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("email already exist");
  
      const values = [
        req.body.email
      ];
  
      db.query(createAddEmail, [values], (err, data) => {
        if (err) return res.status(500).json(err);
         res.status(200).json("add email");

         
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bayarsuren0310@gmail.com',
      pass: 'mqqzxcdamokspgfd'
    }
  });
  
  const mailOptions = {
    from: 'bayarsuren0310@gmail.com',
    to: req.body.email,
    subject: 'MLPT систем',
    html: `<h1>Тавтай морилно уу</h1><p>Бид бүхэн таньд шинэ мэдээ мэдээллийг цаг алдалгүй хүргэх болно.</p>`
    // template: 'index'
  };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          return res.status(200).json("Email sent");
        }
      });
      });
    });
}

