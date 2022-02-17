const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mySchema=new Schema({
    sentBy:String,
    sentTo:String,
    groupName:{ type:String, required:true }
},{timestamps:true});

const GroupInvitee = mongoose.model('groupInvitee',mySchema);
module.exports=GroupInvitee;