const mongoose = require('mongoose')

const Order = require('../models/order.model.js')

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.createOrder = (req, res, next) => {
  const order = new Order({
    ...req.body
  })
  order.save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.getOrderById = (req, res, next) => {
  order.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.deleteOrderById = (req, res, next) => {
  order.remove({
      _id: req.params.id
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.updateOrder = (req, res, next) => {
  order.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}