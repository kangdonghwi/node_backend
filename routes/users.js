const express = require("express");
const models = require("../models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

process.env.SECRET_KEY = "secret";

router.post("/register", function(req, res) {
  const body = req.body;
  const userData = {
    national: body.national,
    first_name: body.first_name,
    last_name: body.last_name,
    address: body.address,
    email: body.email,
    password: body.password,
    ponenumber: body.ponenumber,
    secu_pass: body.secu_pass
  };

  models.user
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          models.user
            .create(userData)
            .then(user => {
              res.json({ status: user.email + " register" });
            })
            .catch(err => {
              res.send("error : " + err);
            });
        });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch(err => {
      res.json("error : " + err);
    });
});

router.post("/login", (req, res) => {
  models.user
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch(err => {
      console.log (err);
      res.status(400).json({ error: err });
    });
});

module.exports = router;
