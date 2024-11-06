import mongoose from "mongoose";


const stationsSchema=new mongoose.Schema({
    sname:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    photoUrl:{
        type:String,
        require:true
    },
    features:{
        type:String,
        require:true
    },
    bookings:[{
        type:mongoose.Types.ObjectId,
        ref:"Bookings"
    }],
    admin:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"Admin"
    }
})


export default mongoose.model("Stations",stationsSchema)
