import express from "express"
import { deleteBooking, getBooking, newBooking } from "../controllers/booking-controller";

const bookingsRouter=express.Router();

bookingsRouter.post("/",newBooking)
bookingsRouter.get("/:id",getBooking)
bookingsRouter.delete("/:id",deleteBooking)







export default bookingsRouter;
