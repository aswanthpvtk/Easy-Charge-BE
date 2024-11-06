import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";




//get users
export const getAlUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  }
  catch (error) {
    return next(err)
  }
  if (!users) {
    return res.status(500).json({ message: "unexpected error occured" })
  }
  return res.status(200).json({ users })
};




//user registration
export const signup = async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  // Validation: use `||` to check each field separately
  if (!name || name.trim() === "" || !email || email.trim() === "" || !phone || phone.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid data" });
  }
  const hashPassword = bcrypt.hashSync(password)
  let user;
  try {
    // Create a new user instance
    user = new User({ name, email, phone, password: hashPassword });
    // Save the user to the database
    user = await user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  // Handle if saving the user failed
  if (!user) {
    return res.status(500).json({ message: "Unexpected error found" });
  }

  // Return the created user
  return res.status(201).json({ id:user._id ,message: "registration successfully"});
};




//update user
export const updateUser = async (req, res, next) => {

  const id = req.params.id;
  const { name, email, phone, password } = req.body;

  // Validation: use `||` to check each field separately
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !phone &&
    phone.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }
  const hashPassword = bcrypt.hashSync(password)
  let user;
  try {
    user = await User.findByIdAndUpdate(id, { name, email, phone, password: hashPassword })

  }
  catch {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  if (!user) {
    return res.status(500).json({ message: "something went wrong" });
  }
  return res.status(200).json({ message: "updated successfully" });

}

//delete user
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user
  try {
    user = await User.findByIdAndDelete(id)
  }
  catch {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  if (!user) {
    return res.status(500).json({ message: "something went wrong" });
  }
  return res.status(200).json({ message: "deleted successfully" });
}


export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid data" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email })
  }
  catch {
    console.log(err);
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  if(!existingUser){
    return res.status(404).json({ message: "unable to find user from this id" });

  }

  const isPasswordCurrect = bcrypt.compareSync(password, existingUser.password)
  if (!isPasswordCurrect) {
    return res.status(400).json({ message: "Password incurrect" });

  }
  return res.status(200).json({ message: "Login successfull",id: existingUser._id,name:existingUser.name,email:existingUser.email });


}



export const getBookingsOfUser = async (req, res, next) => {

  const id = req.params.id;

  let bookings;

  try {
    bookings = await Bookings.find({user:id});
  }
  catch (err) {
    console.log(err);

    return res.status(500).json({ message: "unexpected error occured" })

  }
  if (!bookings) {
    return res.status(500).json({ message: "unable to get bookings`" })
  }
  return res.status(200).json({ bookings })
};
