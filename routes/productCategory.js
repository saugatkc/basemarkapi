const express = require("express");
const auth = require("../auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ProductCategory = require("../models/productCategory");
const router = express.Router();

router.route("/")
    .get((req, res, next) => {
        ProductCategory.find()
            .then((productCategory) => {
                if (productCategory == null) throw new Error("No Product category available.");
                res.json(productCategory);
            }).catch(next);
    })
    .post((req, res, next) => {
        let category = new ProductCategory(req.body);
        category.save()
            .then((category) => {
                res.statusCode = 201;
                res.json(category);
            }).catch(next)
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })
    .delete((req, res, next) => {
        ProductCategory.deleteMany()
            .then((response) => {
                console.log("All product catogories has been deleted.")
                res.json(response);
            })
            .catch(next);
    })

router.route("/:id")
    .get((req, res, next) => {
        ProductCategory.findOne({ _id: req.params.id })
            .then(category => {
                if (category == null) throw new Error("Category has been removed.");
                res.json(category);
            })
            .catch(next);
    })
    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })
    .put((req, res, next) => {

        ProductCategory.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then(reply => {
                if (reply == null) throw new Error("Sorry, category update failed.");
                res.json(reply);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        ProductCategory.findOneAndDelete({ _id: req.params.id })
            .then(response => {
                res.json(response);
            })
            .catch(next);

    })
module.exports = router;