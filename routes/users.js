import express from "express";
import bcrypt from "bcryptjs";
import verify from "../verifyToken.js";
import db from "../db.js";
import {
  forgotPassword,
  changeEmail,
  getAllUser,
  getUserById,
  deleteUser,
} from "../query/user/user.js";
const router = express.Router();

//forgot password
router.put("/:id", verify, async (req, res) => {
  if (req.user.id + "" === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    try {
      db.query(
        forgotPassword,
        [req.body.password, req.user.id],
        (err, updatedUser) => {
          if (err) res.status(500).json(err);
          res.status(200).json(updatedUser);
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.delete("/:id", verify, async (req, res) => {
  //verify function dotor req.user property-g vvsgej utga onooj ugsun
  if (req.user.isAdmin) {
    try {
      db.query(deleteUser, [req.params.id], (err, data) => {
        if (err) res.status(500).json(err);
        res.status(200).json("User has been deleted");
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only admin can delete account. Sorry looser");
  }
});

router.get("/:id", async (req, res) => {
  try {
    db.query(getUserById, [req.params.id], (err, user) => {
      if (err) res.status(500).json(err);
      const { Password, ...info } = user[0];
      res.status(200).json(info);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      db.query(getAllUser, (err, users) => {
        if (err) res.status(500).json(err);
        res.status(200).json(users);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users");
  }
});

export default router;
