import Doctor from '../models/doctorModel.js'

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



export {changeAvailability, doctorList}