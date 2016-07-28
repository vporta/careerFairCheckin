var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  company: String,
  title: String,
  likeme: Boolean
}); 
  
  
  


// create the model for users and expose it to our app
//users
var User = mongoose.model('User', UserSchema);
module.exports = User;