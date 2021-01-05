const express = require("express");
const Order = require("../models/order");
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//ORDERS for ADMIN
router.route("/")
    .get((req, res, next) => {
        Order.find()
            .populate({
                path: "product"
            })
            .populate({
                path: "customer"
            })
            .then(order => {
                if (order == null) throw new Error("Not order yet.");
                res.json(order);
            }).catch(next)
    })

    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not needed now." });
    })
    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })
    .delete((req, res, next) => {
        Order.deleteMany()
            .then(response => {
                console.log("order data deleted")
                res.json(response);
            })
            .catch(next);
    });

//CUSTOMERS'S INDIVIDUAL ORDERS
router.route('/myOrders')
    .get(auth.verifyUser, (req, res, next) => {
        Order.find({ customer: req.user._id })
            .populate({
                path: "product"
            })
            .then(order => {
                if (order == null) throw new Error("Not ordered yet.");
                res.json(order);
            }).catch(next)
    })
    .post(auth.verifyUser, (req, res, next) => {
        let order = new Order(req.body);
        order.customer = req.user._id;
        order
            .save()
            .then(order => {
                res.statusCode = 201;
                res.json(order);
            })
            .catch(next);
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Order.deleteMany({ customer: req.user._id })
            .then(response => {
                console.log("Orders doesnot belong to you")
                res.json(response);
            })
            .catch(next);
    });

//CUSTOMER'S Specific Order Operations
router.route("/myOrders/:oid")
    .get(auth.verifyUser, (req, res, next) => {
        Order.findOne({ customer: req.user._id, _id: req.params.oid })
            .populate({
                path: 'product'
            })
            .then(order => {
                if (order == null) throw new Error("Property has been removed or doesnot belongs to you.");
                res.json(order);
            })
            .catch(next);
    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })
    .put(auth.verifyUser, (req, res, next) => {
        Order.findOneAndUpdate(
            { customer: req.user._id, _id: req.params.oid },
            { $set: req.body },
            { new: true }
        )
            .populate({
                path: 'product'
            })
            .then(reply => {
                if (reply == null) throw new Error("Sorry, order update failed.");
                res.json(reply);
            })
            .catch(next);
    })
    .delete(auth.verifyUser, (req, res, next) => {
        Order.findOneAndDelete({ customer: req.user._id, _id: req.params.oid })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })

//ADMIN ORDER OPERATIONS
router.route("/:oid")
    .get((req, res, next) => {
        Order.findOne({ _id: req.params.oid })
            .populate({
                path: 'product'
            })
            .then(order => {
                if (order == null) throw new Error("Property has been removed.");
                res.json(order);
            })
            .catch(next);
    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })
    .put((req, res, next) => {
        Order.findOneAndUpdate(
            { _id: req.params.oid },
            { $set: req.body },
            { new: true }
        )
            .populate({
                path: 'product'
            })
            .then(reply => {
                if (reply == null) throw new Error("Sorry, order update failed.");
                res.json(reply);
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        Order.findOneAndDelete({ _id: req.params.oid })
            .then(response => {
                res.json(response);
            })
            .catch(next);
    })


module.exports = router;