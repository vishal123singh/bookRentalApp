const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const User = sequelize.define('User', {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{});



module.exports = { User };