import mongoose from "mongoose";
const Schema=mongoose.Schema;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minLength:6,
    },
    bookings:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Bookings"
        }
    ]
})

export default mongoose.model("User",userSchema)