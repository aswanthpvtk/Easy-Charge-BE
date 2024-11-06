import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    station: {
        type: mongoose.Types.ObjectId,
        ref:"Stations",
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    slot: {
        type: Number,

    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        require: true
    }
})

export default mongoose.model("Booking",bookingSchema)