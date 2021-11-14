const mongoose = require('mongoose');
const User = require('./userScheema');


const TicketScheema=new mongoose.Schema({
    subject:{
        type:String
    },
    request:{
        type:String,
        default:""
    },
    orderID:{
        type:String
    },
    descs:[
        {
            type:String,
            
        }
    ],
    name:{
        type:String
    },
    role:{
        type:String
    },
    payment:{
        type:String,
        default:""
    },
    transactionID:{
        type:String,
        default:""
    },
   status:{
        type:String,
        default:"Not Answered"
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})

const Ticket=mongoose.model("Ticket",TicketScheema);
module.exports=Ticket;


