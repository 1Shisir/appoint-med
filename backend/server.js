import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/database.js';
import connectClodinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;  // Default port is 4000  if not specified in .env file
connectClodinary();

//middleware
app.use(cors());
app.use(express.json()); //parse json

//api endpoints
app.use('/api/user',userRouter) //domain/api/auth/register or login
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);

//listen
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });