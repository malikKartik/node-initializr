const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
    unique: false
  },
})

module.exports = mongoose.model('Blog', blogSchema)