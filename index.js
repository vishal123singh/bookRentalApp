
require('dotenv').config();
const app_host = process.env.APP_SERVER;
const port = process.env.PORT; 

const express = require('express');
const app = express();
const { sequelize } = require('./models/userAndBook');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const { authRoutes } = require('./routes/userRoutes');
//const {bookRoutes} = require('./routes/bookRoutes');
const { verifyToken } = require('./middleWares/verifyToken');


const pdfRead = 'godaan.pdf';



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authRoutes);
//app.use(bookRoutes);


app.get('/',(req,res)=>{
    fs.readFile('homePage2.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data);
      });
})

app.get('/signupform',(req,res)=>{
    fs.readFile('signupform.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data);
      });
});

app.get('/signinform',(req,res)=>{
    fs.readFile('loginform.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data);
      });
});

app.get('/api/getbook/Godaan',verifyToken, (req,res)=>{
  let readStream = fs.createReadStream(pdfRead);

  readStream.on('open',()=>{
    readStream.pipe(res);
  });

  readStream.on('error',(err)=>{
    res.end(err);
  });

})


app.listen(port, async ()=>{
    console.log(`App is listening at http://${app_host}/${port}`);

    try{
         await sequelize.authenticate();
         console.log('Connection has been established successfully.');
    }
    catch(error){
        console.log('Unable to connect to the database ',error);
    }

    try{
        await sequelize.sync({alter:true});
        console.log("All models were synchronized successfully.");
    }
    catch(error){
        console.log('Could not synchronize the models', error);
    }
});

