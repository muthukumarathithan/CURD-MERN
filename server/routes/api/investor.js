const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post.js");
const Profile = require("../../models/Profile.js");
const Investor = require("../../models/investor.js")
const validatePostInput = require("../../validation/post.js");

router.get("/", (req, res) => {
    Investor.find()
    .sort({ date: -1 })
    .then(investor => res.json(investor))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

router.get("/:id", (req, res) => {
Investor.findById(req.params.id)
    .then(investors => res.json(investors))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      
      const newInvestor = new Investor({
        Investor: req.body.Investor,
        Plan: req.body.Plan,
        Term: req.body.Term,
        Amount: req.body.Amount,
        TotalReturns: req.body.TotalReturns,
        Maturity: req.body.Maturity,
        Status: req.body.Status,
        Time: req.body.Time
      });
  
      newInvestor.save().then(investor => res.json(investor));
    }
  );

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Investor.findById(req.params.id)
          .then(investor => {
            if (investor.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized" });
            }
  
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ postnotfound: "Remove Investor" }));
    }
  );



module.exports = router;
