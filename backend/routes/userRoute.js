import express from 'express'
import { bookAppointment, cancelAppointment, getUserProfile, listAppointment, loginUser, registerUser, updateUserProfile } from '../controllers/UserController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getUserProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateUserProfile)

userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)

export default userRouter