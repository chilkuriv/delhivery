var Q = require('q');
var PaymentService = require('../services/paymentService');

module.exports.controller = function(app) {
    //payments get post 
    app.route('/payments')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res) {
        PaymentService.findPayments()
        .then(function(payments) {
            res.json(payments);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .post(function(req, res) {
        PaymentService.createPayment(req.body)
        .then(function(payment) {
            res.json(payment);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    });

    //get payments by id route 
    app.route('/payment/:id')
    .all(function(req, res, next) {
        next();
    })
    .get(function(req, res) {
        PaymentService.findPaymentById(req.params.id)
        .then(function(payment) {
            res.json(payment);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .put(function(req, res) {
        PaymentService.updatePayment(req.params.id, req.body)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    })
    .delete(function(req, res) {
        PaymentService.deletePayment(req.params.id)
        .then(function(obj) {
            res.json(obj);
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

};