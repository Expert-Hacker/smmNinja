const { urlencoded } = require('express');
const express = require('express')
// import express from 'express'
const path=require("path");
const app= express();
const port= process.env.PORT || 5000;
const router=require('./Routers/router.js')
require('./Database/db.js')
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cookieParser())

app.use(express.json()) 
//router middleware
app.use(router)

// app.get('/',(req,res)=>{
//     res.send("smm panel")
// })

// if(process.env.NODE_ENV=="production")
// {
//     app.use(express.static("client/build"));

//     const path=require("path");
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.use(express.static(path.join(__dirname,'build')));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.listen(port,()=>{
    console.log(`server is Running at Port ${port}`)
})