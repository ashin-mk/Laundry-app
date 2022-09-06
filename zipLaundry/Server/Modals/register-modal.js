const mongoose=require("mongoose")

const Regschema=mongoose.Schema({
    Name:String,
    Phone:Number,
    Email:String,
    Password:String,
    District:String,
    State:String,
    Pincode:Number,
    Address:Array,
})
const Users=mongoose.model("Users",Regschema)
module.exports=Users