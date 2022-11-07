import db from "../db.js";
import { addExamQuery } from "../query/admin/admin.js";
import { deleteExamQuery } from "../query/admin/admin.js";
import {updateExamQuery} from "../query/admin/admin.js";

export const addExam = (req, res) => {
    const values = [
      req.body.name,
      req.body.level,
      req.body.fee
    ];

    db.query(addExamQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Exam has been created.");
    });
};

export const deleteExam = (req, res) => {
  // const token = req.cookies.access_token;
  // if (!token) return res.status(401).json("Not authenticated!");

  // jwt.verify(token, "jwtkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");

    const postId = req.body.id;

    db.query(deleteExamQuery, [postId], (err, data) => {
      console.log(postId)
      if (err) return res.status(403).json("ямар нэгэн алдаа хахаха дахиад шалга");

      return res.json("Exam has been deleted!");
    });
  // });
};

export const UpdateExam = (req, res) => {
  
      const postId = req.body.id;
      const values = [
        req.body.name,
        req.body.level,
        req.body.fee
      ];
  
      db.query(updateExamQuery, [...values, postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Exam has been updated.");
      });
  };
