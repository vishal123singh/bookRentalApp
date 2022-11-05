const { DataTypes } = require('sequelize'); 
const { sequelize } = require('../db');
const { User } = require('./userTable');
const { Book } = require('./booksTable');

const UserAndBook = sequelize.define('UserAndBook', {
    userId:{
        type:DataTypes.INTEGER,
        unique:false,
        allowNull:false,
        primaryKey:true,
        references:{
            model:User,
            key:'id'
        },
        
    },
    bookId:{
        type:DataTypes.INTEGER,
        unique:false,
        allowNull:false,
        primaryKey:true,
        references:{
            model:Book,
            key:'isbn'
        },
        
       
    }
},{});

Book.belongsToMany(User, {through: UserAndBook ,foreignKey:'userId'});
User.belongsToMany(Book, {through: UserAndBook ,foreignKey:'bookId'});


module.exports = { sequelize };
