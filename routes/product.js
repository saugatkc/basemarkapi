const express = require("express");
const auth = require("../auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Product = require("../models/product");
const router = express.Router();

//POSTING PRODUCTS
router.route("/")
    .get((req, res, next) => {
        Product.find()
            .then(product => {
                if (product == null) throw new Error("Products did not found.");
                res.json(product)
            })
            .catch(next);
    })

    .post((req, res, next) => {
        let product = new Product(req.body);
        product.save()
            .then(product => {
                res.statusCode = 201;
                res.json(product);
            })
            .catch(next);
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })
    .delete((req, res, next) => {
        Product.deleteMany()
            .then(response => {
                console.log("All product deleted.")
                res.json(response);
            })
            .catch(next);
    })

router.route("/:id")
    .get((req, res, next) => {
        Product.findOne({ _id: req.params.id })
            .then(product => {
                if (product == null) throw new Error("Product not available.");
                res.json(product);
            })
            .catch(next);
    })
    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })

    .put((req, res, next) => {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then(reply => {
                if (reply == null) throw new Error("Sorry! product didn't updated.");
                res.json(reply);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        Product.findOneAndDelete({ _id: req.params.id })
            .then(response => {
                console.log("Product deleted successfully.")
                res.json(response);
            })
            .catch(next);
    })


//SEARCH PRODUCT WITH TITLE
router.route("/search/:tid")
    .get((req, res, next) => {
        Product.find({ product_title: req.params.tid })
            .then(product => {
                if (product == null) throw new Error("No product found.");
                res.json(product);
            })
            .catch(next);
    })

//SEARCH PRODUCT WITH TITLE
router.route("/search/:sid")
    .get((req, res, next) => {
        Product.find({ product_title: req.params.sid })
            .then(product => {
                if (product == null) throw new Error("No product found.");
                res.json(product);
            })
            .catch(next);
    })

//FILTER PRODUCT WITH GENDER
router.route("/fiteredProductWithGender/:gender")
    .get((req, res, next) => {
        Product.find({ product_gender: req.params.gender })
            .then(product => {
                if (product == null) throw new Error("No product found.");
                res.json(product);
            })
            .catch(next);
    })
//FILTER PRODUCT WITH CATEGORY
router.route("/fiteredProductWithCategory/:category")
    .get((req, res, next) => {
        Product.find({ product_category: req.params.category })
            .then(product => {
                if (product == null) throw new Error("No product found.");
                res.json(product);
            })
            .catch(next);
    })

module.exports = router;