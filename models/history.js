const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
 projectid: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
 action:{ type:String,required: true},
 doneBy:{ type:String ,required:true},
 description:{type:String,required:true}
});

module.exports = mongoose.model("History", historySchema);
