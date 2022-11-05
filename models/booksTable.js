const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Book = sequelize.define('Book', {

    isbn :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    language:{
        type:DataTypes.STRING,
        allowNull:false
    },
    genre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    publishedOn:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    addedOn:{
        type:DataTypes.DATEONLY,
        defaultValue:DataTypes.NOW
    },
    upForRent:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
}, {
    timestamps:false
    });

module.exports = { Book }