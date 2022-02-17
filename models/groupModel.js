const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    name:{ type:String, required:true },
    picture:{ type:String, default:"pp.jpg" },
    createdBy:{ type:String, required:true },
    groupMembers:[{ type: Schema.Types.ObjectId, ref: "User" }],
    transactions:[{ type: Schema.Types.ObjectId, ref: "Transaction" }]
},{timestamps:true});

const Group= mongoose.model('group',mySchema);
module.exports=Group;