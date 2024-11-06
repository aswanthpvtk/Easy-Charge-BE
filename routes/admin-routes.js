import express from "express";
import { addAdmin, adminLogin, getAdmins } from "../controllers/admin-controller";


const adminRouter=express.Router();

adminRouter.post('/signup',addAdmin)
adminRouter.post('/login',adminLogin)
adminRouter.get('/getAdmins',getAdmins)
// adminRouter.get("/:id", getAdminById);




export default adminRouter;