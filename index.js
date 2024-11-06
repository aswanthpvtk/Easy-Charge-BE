import mongoose from 'mongoose';
import express, { Router } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes';
import adminRouter from './routes/admin-routes';
import stationRouter from './routes/station-routes';
import bookingRouter from './routes/booking-routes'
import cors from 'cors'; // Importing cors


dotenv.config()

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json())

app.use(cors()); // Enabling CORS for all routes


//middleware
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/station",stationRouter);
app.use("/booking",bookingRouter);




// Connect to MongoDB
mongoose.connect(`mongodb+srv://paswanthvtk:${process.env.MONGODB_PASSWORD}@cluster0.1p4dg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

).then(() =>
    app.listen(5000, () =>
        console.log("connected to database and server is running")
    )
).catch((e)=>console.log(e));


