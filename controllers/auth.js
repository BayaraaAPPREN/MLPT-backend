import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { checkUserExit, createNewUser } from "../query/auth/auth.js";

export const login = (req, res) => {
  let isAdmin = false;
  db.query(checkUserExit, [req.body.email], (err, data) => {
    const userData = data[0];

    if (err) return res.status(500).json(err);
    if (!userData) return res.status(400).json("User not found");

    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      userData.Password
    );

    if (!checkedPassword)
      return res.status(400).json("Wrong password or email");
    if (userData.type === 2) isAdmin = true;
    const token = jwt.sign({ id: userData.userId, isAdmin }, "secret key");
    console.log(token);

    const { password, ...others } = userData;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const register = (req, res) => {
  db.query(checkUserExit, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("user email already exist");

    //CREATE NEW USER
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const values = [
      req.body.email,
      hashedPassword,
      req.body.phoneNum,
      req.body.nationality,
      req.body.fname,
      req.body.lname,
      0,
    ];

    db.query(createNewUser, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User created");
    });
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User loged out");
};
