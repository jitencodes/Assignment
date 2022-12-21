const express = require('express');
const app = express();
const mongoose = require('mongoose');
// IMPORTING ROUTES
const userRoute  = require('./Routes/UserRoute');
const authRoute = require('./Routes/AuthRoute');
const departmentrRoute = require('./Routes/DepartmentRoute');
// CONFIG
require('dotenv/config');

// CONNECTING DB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},()=>console.log('connected to DB'))

// MIDDLEWARES
app.use(express.json())

// ROUTE MIDDLEWARES
app.use('/auth',authRoute);
app.use('/users',userRoute);
app.use('/departments',departmentrRoute);

// STARTING SERVER
app.listen(2000,()=>console.log('server starts'));

// app.use('/',(req,res)=>{
//     res.send("ok")
// })