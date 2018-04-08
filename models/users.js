var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersModelSchema = new Schema({
  name:  String,
  password: String,
  createAt: { type: Date, default: Date.now },
  status: Boolean,
 
});

var usersModel = mongoose.model('usersModel', usersModelSchema );
module.exports = usersModel;