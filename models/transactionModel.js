const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    paidBy:{ type: Schema.Types.ObjectId, ref: "User" },
    paidTo:[{ type: Schema.Types.ObjectId, ref: "UserShare" }],
    amount:{ type:Schema.Types.Decimal128, default:0.0 }
},{timestamps:true});

const Transaction = mongoose.model('transaction',mySchema);
module.exports=Transaction;