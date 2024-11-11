import Validator from 'validator';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

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

export { registerUser,loginUser,getUserProfile,updateUserProfile };
