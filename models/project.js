const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  createdBy:{ type:String, required:true },
  users: [{ type: String }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bills:[{ name:String,payer:String,to:[{type:String}],amount:Number}],
  expenses:[{ name:String,payer:String,to:String,amount:Number}]
});

module.exports = mongoose.model("Project", projectSchema);
