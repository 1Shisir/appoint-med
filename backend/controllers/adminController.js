import validator from "validator";
import bcryptjs from "bcryptjs";
import {v2 as cloudinary} from 'cloudinary';
import Doctor from "../models/doctorModel.js";
import  'dotenv/config';
import jwt from "jsonwebtoken";
import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";

///API to add doctors
const addDoctors = async (req, res) => {
    try {
        const {name, email, password, speciality, degree, fees, experience, about, address} = req.body; 
        const imageFile = req.file;

        //Check if all fields are filled
        if (!name || !email || !password || !speciality || !degree || !fees || !experience || !about || !address || !imageFile) {
            return res.status(400).json({ success: "false",message: "All fields are required"});
        }

        //validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: "false",message: "Invalid email"});
        }

        //validate password
        if (password.length < 8) {
            return res.status(400).json({ success: "false",message: "Password should be atleast 8 characters long"});
        }

        //Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        //Create doctor
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            image: imageUrl,
            fees,
            experience,
            about,
            address,
            date: new Date().toISOString(),
        }
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: "true", message: "Doctor added successfully"});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: "false",message: error.message});
    }
};


//PI FOR admin login

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if all fields are filled
        if (!email || !password) {
            return res.status(400).json({ success: "false",message: "All fields are required"});
        }

        //validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: "false",message: "Invalid email"});
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);

            return res.status(200).json({ success: "true", message: "Admin logged in successfully",token});
        } else {
            return res.status(400).json({ success: "false", message: "Invalid email or password"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: "false",message: error.message});
    }
};

//api to get all doctors for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({attributes: {exclude: ['password']}});
        res.json({success: "true", doctors});
        
    } catch (error) {
        console.log(error);
        res.json({success: "false",message: error.message});
    }
}

//API to get all doctor appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({}); 
        res.json({success: "true", appointments});
    } catch (error) {
        console.log(error);
        res.json({success: "false",message: error.message});
    }
}

//API to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        const {appointmentId} = req.body;

        const appointmentData = await Appointment.findByPk(appointmentId);

        
        await Appointment.update(
            {cancelled: true},
            {where: {_id: appointmentId}  });
        
        //releasing doctor slot
        const {docId,slotDate,slotTime} = appointmentData;
        const docData = await Doctor.findByPk(docId);
        let slots_booked = JSON.parse(docData.slots_booked);

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);

        await Doctor.update(
            {slots_booked: JSON.stringify(slots_booked)},
            {where: {_id: docId}  });
        
        res.json({success:true,message:"Appointment cancelled successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message});   
        
    }
}

//API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({});
        const users = await User.findAll({});
        const appointments = await Appointment.findAll({});

        const dashData = {
            doctors: doctors.length,
            patients: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success: "true", dashData});
        
    } catch (error) {
        console.log(error);
        res.json({success: "false",message: error.message});
    }
}

export {addDoctors, adminLogin, allDoctors, appointmentsAdmin , appointmentCancel, adminDashboard};