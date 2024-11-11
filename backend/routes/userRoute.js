import express from 'express'
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/UserController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getUserProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateUserProfile)

export default userRouter