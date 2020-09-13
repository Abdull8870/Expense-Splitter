const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  countries: [{type:String}],
  phoneCode:[{code:String,num:String}]
});

module.exports = mongoose.model("Signup", signupSchema);
