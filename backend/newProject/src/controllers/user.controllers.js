const mongoose = require('mongoose')

const User = require('../models/user.model.js')

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.createUser = (req, res, next) => {
  const user = new User({
    ...req.body
  })
  user.save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.getUserById = (req, res, next) => {
  user.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.deleteUserById = (req, res, next) => {
  user.remove({
      _id: req.params.id
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}

exports.updateUser = (req, res, next) => {
  user.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
}