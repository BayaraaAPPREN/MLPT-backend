import db from "../db.js";
import {getAllExamList}from "../query/exam/getAllExam.js";

export const getAllExam = (req, res) => {
    db.query(getAllExamList, (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data.length);
      if (data.length<=0){
        return res.status(400).json("not find exam information");
      } else {
        return res.status(200).send(JSON.parse(JSON.stringify(data)));
      }
    });
  };