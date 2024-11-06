
import jwt from 'jsonwebtoken'
import Stations from '../models/Stations.js';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';



export const addStation = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];//berer
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
    }

    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });

        }
        else {
            adminId = decrypted.id
        }
    })
    //create new station
    const { sname, description, photoUrl, features,location } = req.body
    if (
        !sname &&
        sname.trim() === "" &&
        !description &&
        description.trim() === "" &&
        !photoUrl &&
        photoUrl.trim() === "" &&
        !features &
        features.trim() === "" &&
        !location &
        location.trim() === ""
    ) {
        return res.status(402).json({ message: "invalid inputs" });

    }

    let station;
    try {
        station = new Stations({ sname, description, photoUrl, features,location, admin: adminId });

        const session=await mongoose.startSession();
        const adminUser=await Admin.findById(adminId)
        session.startTransaction();
        await station.save({session})
        adminUser.addedStation.push(station);
        await adminUser.save({session})
        await session.commitTransaction();

        // station = await station.save()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }

    if (!station) {
        return res.status(500).json({ message: "Request Failed" });

    }

    return res.status(201).json({ station });


}


export const getAllStation = async (req, res, next) => {
    let station;
    try {
        station = await Stations.find();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    if (!station) {
        return res.status(500).json({ message: "Request Failed" });

    }
    return res.status(200).json({ station });

}




export const getStationById = async (req, res, next) => {
    const id = req.params.id;
    let station;
    try {
        station = await Stations.findById(id);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unexpected error occurred" });
    }
    if (!station) {
        return res.status(500).json({ message: "Invalid movie id" });

    }
    return res.status(200).json({ station });

}