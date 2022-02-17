const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true },
    transactions:[{ type: Schema.Types.ObjectId, ref: "Transaction" }],
    balance:{ type:mongoose.Types.Decimal128, default:0.0 }
},{timestamps:true});

const Friend = mongoose.model('friend',mySchema);
module.exports=Friend;