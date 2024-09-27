   import { DataTypes} from "sequelize";
    import sequelize from "../config/database.js";

     export const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
              },
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue:"XXXXXXXXXX"
        },
        image:{
            type: DataTypes.STRING,
            defaultValue:""
        },
        role: {
            type: DataTypes.ENUM("user","doctor", "admin"),
            defaultValue: "user",
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            defaultValue:"Not Specified"
        },
        dob:{
            type:DataTypes.STRING,
            defaultValue:"Not Specified"
        },
        address:{
            type: DataTypes.JSON,
            defaultValue: {
                line1: " ",
                line2: " ",
            }
        }
    });

    export default User;
