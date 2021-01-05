const express = require("express");

const Feedback = require("../models/feedback");
const auth = require("../auth");
const router = express.Router();

router.route("/")
    .get((req, res, next) => {
        Feedback.find()
            .populate({
                path: 'customer'
            })
            .then((feedback) => {
                if (feedback == null) throw new Error("No feedbacks available.");
                res.json(feedback);
            }).catch(next)
    })
    .post(auth.verifyUser, (req, res, next) => {
        let feedback = new Feedback(req.body);
        feedback.customer = req.user._id;
        feedback.save()
            .then((myfeedback) => {
                res.json(myfeedback);
            }).catch(next)
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Feedback.deleteMany({ customer: req.user._id })
            .then(response => {
                console.log("All products had been removed.")
                res.json(response);
            })
            .catch(next);
    })

//ROUTES FOR OPERATING SPECIFIC Feedbacks
router.route('/:fid')
    .get(auth.verifyUser, (req, res, next) => {
        Feedback.findOne({ _id: req.params.fid })
            .populate({
                path: 'customer'
            })
            .then((feedback) => {
                if (feedback == null) throw new Error("Feedback seems to be removed.");
                res.json(feedback);
            }).catch(next)

    })
    .post(auth.verifyUser, (req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .put(auth.verifyUser, (req, res, next) => {
        Feedback.findOneAndUpdate(
            { customer: req.user._id, _id: req.params.fid },
            { $set: req.body },
            { new: true }
        )
            .then(reply => {
                if (reply == null) throw new Error("Sorry, feedback update failed.");
                res.json(reply);
            })
            .catch(next)
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Feedback.findOneAndDelete({ customer: req.user._id, _id: req.params.fid })
            .then(response => {
                console.log("feedback has been removed")
                res.json(response);
            })
            .catch(next);
    })

module.exports = router;