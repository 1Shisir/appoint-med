import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Appointment = sequelize.define("appointment", {
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    docId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    slotDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    slotTime:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userData: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('userData');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('userData', JSON.stringify(value));
        }
    },
    docData: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('docData');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('docData', JSON.stringify(value));
        }
    },
    amount:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cancelled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    payment:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isCompleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    
});

export default Appointment;