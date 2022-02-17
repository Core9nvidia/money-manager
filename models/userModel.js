const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    name:{ type:String, required:true },
    email:{ type:String, required:true },
    profilePicUrl:{ type:String, default:'/images/profile.jpg' },
    totalYouPaid:{ type:mongoose.Types.Decimal128, default:0.0 },
    totalYourShare:{ type:mongoose.Types.Decimal128, default:0.0 },
    totalYouOwe:{ type:mongoose.Types.Decimal128, default:0.0 },
    totalYouAreOwed:{ type:mongoose.Types.Decimal128, default:0.0 },
    friendList:[{ type: Schema.Types.ObjectId, ref: "User" }],
    groups:[{ type: Schema.Types.ObjectId, ref: "Group" }],
    groupInvitees:[],
    friendInvitees:[]
},{timestamps:true});

const User= mongoose.model('user',mySchema);
module.exports=User;