import express from "express";
import { addDoctors, adminLogin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor",authAdmin,upload.single("image"), addDoctors);
adminRouter.post("/login", adminLogin);

export default adminRouter;