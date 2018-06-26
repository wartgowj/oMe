const db = require("../models");

// Defining methods for the cxplacesController
module.exports = {
    findAllDistance: function (req, res) {
        db.Cxplace
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAllBuy: function(req, res) {
        db.Cxplace
            .find(req.query)
            .sort({ buy: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findAllSell: function (req, res) {
        db.Cxplace
            .find(req.query)
            .sort({ sell: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function(req, res) {
        db.Cxplace
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    update: function(req, res) {

        if (req.body.buy && req.body.sell) {

            if (req.body.comments) {
                db.Cxplace
                    .findByIdAndUpdate({ _id: req.params.id }, { $set: { buy: req.body.buy, sell: req.body.sell, user: req.body.user, date: req.body.date }, $push: { comments: req.body.comments } }, { new: true })
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));

            } else {
                db.Cxplace
                    .findByIdAndUpdate({ _id: req.params.id }, { $set: { buy: req.body.buy, sell: req.body.sell, user: req.body.user, date: req.body.date}})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

            }
            
        } else if (req.body.buy) {
            db.Cxplace
                .findByIdAndUpdate({ _id: req.params.id }, { $set: { buy: req.body.buy, user: req.body.user, date: req.body.date}})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

        } else if (req.body.sell) {

            db.Cxplace
                .findByIdAndUpdate({ _id: req.params.id }, { $set: { sell: req.body.sell, user: req.body.user, date: req.body.date}})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

        } else if (req.body.comments) {

            db.Cxplace
                .findByIdAndUpdate({ _id: req.params.id }, {$push: {comments: req.body.comments}}, {new: true})
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));

        } 

    }
};