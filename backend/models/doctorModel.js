import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

  const Doctor = sequelize.define("doctor", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull:false
    },
    degree: {
      type: DataTypes.STRING,
      allowNull:false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:''
    },
    fees: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,

    },
    about: {
      type: DataTypes.TEXT,

    },
    address: {
      type: DataTypes.STRING,
    },
    available:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    date:{
      type:DataTypes.STRING,
    },
    slots_booked:{
      type:DataTypes.STRING,
    }
  });


  export default Doctor;