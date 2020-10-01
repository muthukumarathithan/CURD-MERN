const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post.js");
const Profile = require("../../models/Profile.js");
const Sales = require("../../models/sales.js")

router.get("/", (req, res) => {
    Sales.find()
    .sort({ date: -1 })
    .then(sales => res.json(sales))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

router.get("/:id", (req, res) => {
Sales.findById(req.params.id)
    .then(sales => res.json(sales))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      
      const newSales = new Sales({
        name: req.body.name,
        age: req.body.age,
        mobile: req.body.mobile,
        city: req.body.city,
        country: req.body.country,
      });
  
      newSales.save().then(sales => res.json(sales));
    }
  );

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Sales.findById(req.params.id)
          .then(sales => {
            sales.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ postnotfound: "Remove Investor" }));
    }
  );



module.exports = router;
