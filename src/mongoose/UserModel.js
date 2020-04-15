const mongoose = require('mongoose')
const Schema = mongoose.schema;

const userSchema = new Schema({
  usenamse: String,
  password: String,
  avatar: {
    type: String,
    default: ''
  },
  projects: [{
    type: String,
    name: String,
    items: [{
      projectId: String,
      projectName: String
    }]
  }]
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;