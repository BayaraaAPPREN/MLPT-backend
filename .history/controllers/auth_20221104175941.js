import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import checkUserExit from "../query/auth/checkUserExit.js";
import checkIsAdmin from "../query/auth/checkIsAdmin.js";
import createNewUser from "../query/auth/createNewUser.js";

export const login = (req, res) => {
  let isAdmin = false;
  db.query(checkUserExit, [req.body.email], (err, data) => {
    const userData = data[0];
    console.log(userData.userId);

    if (err) return res.status(500).json(err);
    // if (!userData ) return res.status(400).json("User not found");

    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      userData.password
    );

    if (!checkedPassword)
      return res.status(400).json("Wrong password or email");

    db.query(checkIsAdmin, [req.body.email, req.body.password], (err, data) => {
      if (data === "2") {
        isAdmin = true;
      }
    });
    const token = jwt.sign({ id: userData.id, isAdmin }, "secret key");

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
      req.body.phoneNumber,
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
