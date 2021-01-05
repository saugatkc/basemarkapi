const express = require("express");

const Cart = require("../models/cart");
const auth = require("../auth");
const router = express.Router();

router.route("/")
    .get(auth.verifyUser, (req, res, next) => {
        Cart.find({ customer: req.user._id })
            .populate({
                path: 'product'
            })
            .then((cart) => {
                if (cart == null) throw new Error("No products had been added to cart.");
                res.json(cart);
            }).catch(next)
    })

    .post(auth.verifyUser, (req, res, next) => {
        let cart = new Cart(req.body);
        cart.customer = req.user._id;
        cart.save()
            .then((cart) => {
                res.json(cart);
            }).catch(next)
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Cart.deleteMany({ customer: req.user._id })
            .then(response => {
                console.log("All products had been removed.")
                res.json(response);
            })
            .catch(next);
    })

//ROUTES FOR OPERATING SPECIFIC CARTS
router.route('/:cid')
    .get(auth.verifyUser, (req, res, next) => {
        Cart.findOne({ customer: req.user._id, _id: req.params.cid })
            .populate({
                path: 'product'
            })
            .then((item) => {
                if (item == null) throw new Error("Products seems to be removed.");
                res.json(item);
            }).catch(next)

    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not needed" });
    })
    .delete(auth.verifyUser, (req, res, next) => {
        Cart.findOneAndDelete({ customer: req.user._id, _id: req.params.cid })
            .then(response => {
                console.log("product has been removed")
                res.json(response);
            })
            .catch(next);
    })

module.exports = router;