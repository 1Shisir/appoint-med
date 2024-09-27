import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/auth.route.js';
import sequelize from './config/database.js';
import connectClodinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;  // Default port is 4000  if not specified in .env file
connectClodinary();

const corsOption= {
    origin: "true"
}

//middleware
app.use(cors(corsOption));
app.use(express.json()); //parse json
app.use('/api/auth', authRoutes); //domain/api/auth/register or login
app.use('/api/admin',adminRouter);

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