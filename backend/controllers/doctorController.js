import Doctor from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Appointment from '../models/appointmentModel.js'

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

//API to get doctor appointments
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await Appointment.findAll({
            where: { docId },
        });

        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
}

//API to mark appointment as completed
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        // Fetch appointment data
        const appointmentData = await Appointment.findByPk(appointmentId);

        console.log(typeof docId, typeof appointmentData.docId)

        // Check if appointment exists and matches the doctor
        if (!appointmentData) {
            res.json({ success: false, message: 'Appointment not found' });
        } else if (Number(appointmentData.docId) !== Number(docId)) {
            res.json({ success: false, message: 'Mark failed' });
        }
        else{
            await Appointment.update(
                { isCompleted: true },
                { where: { _id: appointmentId } }
            );
            res.json({ success: true, message: 'Appointment marked as completed' });
        }
    } catch (error) {
        console.error('Error in appointmentComplete:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//API to cnacel appointment
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentData = await Appointment.findByPk(appointmentId)

        if(!appointmentData) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });   
        } else  if (Number(appointmentData.docId) !== Number(docId)) {
            res.json({ success: false, message: 'Cancellation failed' });
        }
        else{
            await Appointment.update(
                { cancelled: true },
                { where: { _id: appointmentId } }
            );
            res.json({ success: true, message: 'Appointment cancelled successfully' });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}



export {changeAvailability, doctorList, doctorLogin, appointmentsDoctor,appointmentComplete, appointmentCancel}