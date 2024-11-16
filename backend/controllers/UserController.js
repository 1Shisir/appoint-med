import Validator from 'validator';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import razorpay from 'razorpay';

//API to register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.json({ success:false,message: 'Please enter all fields' });
        }

        //validate email
        if (!Validator.isEmail(email)) {
            return res.json({ success:false,message: 'Please enter valid email' });
        }
        //validate password
        if (password.length < 8) {
            return res.json({ success:false,message: 'Enter a strong password' });
        }
        
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userData ={
            name,
            email,
            password: hashedPassword
        }

        //save user
        const mewUser = new User(userData);
        const user = await mewUser.save();

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
        res.json({success:true, token});


    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message}); 
    }
}

//API to login user
const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        if(!email || !password) {
            return res.json({ success:false,message: 'Please enter all fields' });
        }

        //validate email
        if (!Validator.isEmail(email)) {
            return res.json({ success:false,message: 'Please enter valid email' });
        }
        
        //find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success:false,message: 'User not found' });
        }

        //validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY);
            res.json({success:true, token});
        }else{
            return res.json({ success:false,message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message});   
    }
}

//API to get user profile data
const getUserProfile = async (req, res) => {
    try {

        const {userId} = req.body;
        const userData = await User.findByPk(userId
            ,{attributes: { exclude: ['password'] }}
        );
        console.log(userData);
        res.json({success:true,userData});
    }
    catch{
        console.log(error);
        res.status(500).json({success:false, message:error.message}); 
    }
}


//API to update user profile
const updateUserProfile = async(req,res) => {
    try {
        const {userId, name,dob,gender,phone,address1,address2} = req.body;
        const imageFile = req.file;

        if(!name || !dob || !phone || !gender || !address1 || !address2) {
            return res.json({ success:false,message: 'Data missing' });
        }
        
        await User.update(
            {name,dob,phone,gender,address1,address2},
            {where: {id: userId}  });

        //upload image to cloudinary
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
            const imageUrl = imageUpload.secure_url;

            await User.update(
                {image:imageUrl},
                {where: {id: userId}  });
        }
        res.json({success:true,message:"Profile updated successfully"});   
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message});
    }
}

//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Fetch doctor data and exclude password
        const docData = await Doctor.findByPk(docId, {
            attributes: { exclude: ['password'] }
        });

        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Check if doctor is available
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor is not available' });
        }
     
        
        let slots_booked = {};

        if (docData.slots_booked) {
            // Only parse if slots_booked is not empty
            slots_booked = JSON.parse(docData.slots_booked);
        }

        // Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        // Get user data and exclude password
        const userData = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prepare appointment data, excluding slots_booked
        const docInfo = docData.toJSON();
        console.log(docInfo);
        delete docInfo.slots_booked;

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData: userData.toJSON(),
            docData: docInfo,
            amount: docData.fees,
            date: new Date().toISOString(),
        };

        // Save new appointment
        const newAppointment = await Appointment.create(appointmentData);
        

        // Update doctor's booked slots
        await Doctor.update(
            { slots_booked: JSON.stringify(slots_booked) },
            { where: { _id: docId } }
        );

        res.json({ success: true, message: "Appointment booked successfully", data: newAppointment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//API to get user appointments for frontend my appointments page

const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;

        const appointments = await Appointment.findAll({ where: { userId } });

        res.json({ success: true, appointments });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//API to cancell appointment
const cancelAppointment = async (req, res) => {
    try {
        const {userId, appointmentId} = req.body;

        const appointmentData = await Appointment.findByPk(appointmentId);

        //verify user
        if(appointmentData.userId != userId) {
            return res.json({ success:false,message: 'Unauthorized action' });
        }
        
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

//Future scope

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// //API to make payment
// const paymentRazorpay = async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }


export { registerUser,loginUser,getUserProfile,updateUserProfile, bookAppointment,listAppointment,cancelAppointment };
