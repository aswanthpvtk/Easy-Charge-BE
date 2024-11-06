import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const addAdmin=async(req,res,next)=>{
    const {email,password}=req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid data" });
      }
    let existingAdmin;
    try{
        existingAdmin=await Admin.findOne({email})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    if(existingAdmin){
        return res.status(400).json({ message: "Admin Already exist" });

    }
    let admin;
    const hashedPassword=bcrypt.hashSync(password)
    try{
        admin=new Admin({email,password:hashedPassword})
        admin=await admin.save()
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    if(!admin){
        return res.status(500).json({ message: "unable to store admin" });

    }
    return res.status(201).json({ admin });

}




export const adminLogin=async(req,res,next)=>{
    const {email,password}=req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid data" });
      }
      let existingAdmin;
      try{
        existingAdmin=await Admin.findOne({email})
      }
      catch(err){
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    if(!existingAdmin){
        return res.status(400).json({ message: "Admin not found" });
    }
    const isPasswordCurrect=bcrypt.compareSync(password,existingAdmin.password)
    if(!isPasswordCurrect){
        return res.status(400).json({ message: "invalid or wrong password" });
    }
    const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{
        expiresIn:"7d"
    })
    return res.status(200).json({ message: "Authentication completed" ,token,id:existingAdmin._id,email:existingAdmin.email});
}


export const getAdmins=async(req,res,next)=>{
    let admins;
    try{
        admins=await Admin.findOne()
      }
      catch(err){
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    if(!admins){
        return res.status(400).json({ message: "internal server error" });
    }
    return res.status(200).json({ admins});


}



// export const getAdminById = async (req, res, next) => {
//     const id = req.params.id;
  
//     let admin;
//     try {
//       admin = await Admin.findById(id).populate("addedStation");
//     } catch (err) {
//       return console.log(err);
//     }
//     if (!admin) {
//       return console.log("Cannot find Admin");
//     }
//     return res.status(200).json({ admin });
//   };