import mongoose from "mongoose";
import { Schema } from "mongoose";


const adminSchema=new Schema({
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        minLength:6,
        require:true

    },
    addedStation:[{
        type:mongoose.Types.ObjectId,
        ref:"Stations"
    }]
})

export default mongoose.model('Admin',adminSchema)