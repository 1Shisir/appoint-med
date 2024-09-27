import { Sequelize } from 'sequelize';
import 'dotenv/config';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

// Create a new instance of Sequelize

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql', // Change to 'postgres', 'sqlite', etc. if using a different SQL DB
});

sequelize.authenticate().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.log(err);
});

export default sequelize;