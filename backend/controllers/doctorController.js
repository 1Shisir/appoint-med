import Doctor from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await Doctor.findByPk(docId);

        if (!doctorData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        await Doctor.update(
            { available: !doctorData.available }, // only update the "available" field
            { where: { _id: docId } } // specify the "where" condition
        );

        res.json({ success: true, message: 'Availability changed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const doctorList = async (req,res) => {
    try {
        const doctors = await Doctor.findAll({
            attributes: { exclude: ['email', 'password'] }
        });
        res.json({ success: true, doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


//API for doctor login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.json({ success:false,message: 'Please enter all fields' });
        }

        // check if the doctor exists
        const doctor = await Doctor.findOne({ where: { email } });

        if (!doctor) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, doctor.password);

        if (isPasswordMatch) {
            // generate token
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET_KEY);

        res.json({ success: true, token ,message: 'Login successful' });
        }
        else {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}



export {changeAvailability, doctorList, doctorLogin}