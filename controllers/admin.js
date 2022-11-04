import db from "../db.js";
import { addExamQuery } from "../query/admin/admin.js";
// import {updateExamQuery} from "../query/admin.js"

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


// export const updatePost = (req, res) => {
  
//       const postId = req.params.id;
  
//       const values = [req.body.name, req.body.level, req.body.fee];
  
//       db.query(updateExamQuery, [...values, postId, userInfo.id], (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.json("Post has been updated.");
//       });
//   };
