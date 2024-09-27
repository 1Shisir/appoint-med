import bycrpt from "bcryptjs";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";


const JWT_SECRET = process.env.JWT_Secret_KEY

//route for register
export const register = async (req, res) => {

    const { name, email, password, contact, gender, role } = req.body;
  try {

    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hasedPassword = await bycrpt.hash(password, 10);

    // Create a User
    user = await User.create({
      name,
      email,
      password: hasedPassword,
      contact,
      gender,
      role,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "10h" });

    res.status(201).json({ message: "User created successfully", token });
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//route for  user login

export const login = async (req, res) => {
  res.send("Login");
};

// //route for doctor login

// export const doctorlogin = async (req, res) => {
//   res.send("Doctor Login");
// };

// //route for admin login
// export const adminLogin = async (req, res) => {
//   res.send("Admin Login");
// };

export default { register, login};
