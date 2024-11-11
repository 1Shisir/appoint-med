import express from "express";
import { addDoctors, adminLogin, allDoctors } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctors);
adminRouter.post("/login", adminLogin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);

export default adminRouter;