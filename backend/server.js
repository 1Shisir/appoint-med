import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/database.js';

//app config
const app = express();
const port = process.env.PORT || 4000;  // Default port is 4000  
connectDb();

//middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is running');
});

//listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});