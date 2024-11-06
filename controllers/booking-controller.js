import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Stations from "../models/Stations.js";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
  const { station, date, slot, user } = req.body;

  let existingStation;
  let existingUser;
  let booking;

  // Validate date format before proceeding
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  try {
    // Find the station and user in the database
    existingStation = await Stations.findById(station);
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  // Check if station and user exist
  if (!existingStation) {
    return res.status(404).json({ message: "Station not found" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found with the given ID" });
  }

  // Create a new booking object
  booking = new Bookings({
    station,
    date: new Date(date),
    slot,
    user,
  });

  // Start a session and a transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Add booking references to user and station
    existingUser.bookings.push(booking);
    existingStation.bookings.push(booking);

    // Save the new booking and update the user and station
    await booking.save({ session });
    await existingUser.save({ session });
    await existingStation.save({ session });

    // Commit the transaction
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return res.status(500).json({ message: "Booking failed. Transaction aborted." });
  } finally {
    session.endSession();
  }

  return res.status(201).json({ booking });
};




export const getBooking=async(req,res,next)=>{

const id=req.params.id;
let booking;
  try {
    booking = await Bookings.findById(id);
}
catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
}
if (!booking) {
  return res.status(404).json({ message: "Unexpected error occurred" });
}
return res.status(200).json({ booking});

}





export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    // Find the booking by ID and populate associated user and station
    booking = await Bookings.findById(id).populate("user station");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    // Remove the booking reference from user and station
    await booking.user.bookings.pull(booking._id);
    await booking.station.bookings.pull(booking._id);

    // Save the updated user and station in the same transaction
    await booking.user.save({ session });
    await booking.station.save({ session });

    // Delete the booking
    await Bookings.findByIdAndDelete(id, { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  return res.status(200).json({ message: "Booking deleted successfully" });
};
