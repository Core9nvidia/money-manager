const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    user:{ type: Schema.Types.ObjectId, ref: "User" },
    share:{ type:Schema.Types.Decimal128, default:0.0 }
},{timestamps:true});

const UserShare = mongoose.model('userShare',mySchema);
module.exports=UserShare;