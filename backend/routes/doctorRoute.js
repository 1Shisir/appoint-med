import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorList, doctorLogin } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/appointments', authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)

export default doctorRouter;

