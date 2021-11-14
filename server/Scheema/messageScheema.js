const mongoose = require('mongoose');
const User = require('./userScheema');
const Ticket=require('../Scheema/TicketScheema');
const Messagescheema=new mongoose.Schema({
    message:{
        type:String
    },
    role:{
        type:String
    },
    name:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    ticketid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Ticket,
        required:true
    }
})

const Message=mongoose.model("Message",Messagescheema);
module.exports=Message;