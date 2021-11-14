const mongoose= require('mongoose');

const Servicescheema= new mongoose.Schema({

          
            service:{
                type:Number,
                required:false
            },
            name:{
                type:String,
                required:false
            },
            category:{
                type:String,
                required:false
            },
            rate:{
                type:Number,
                required:false
            },
            min:{
                type:Number,
                required:false
            },
            max:{
                type:Number,
                required:false
            },
            type:{
              type:String,
                required:false            

            },
            desc:{
                type:String,
                required:false
            },
            dripfeed:{
                type:Number,
                required:false
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
   
})
const Service= mongoose.model("Service",Servicescheema)

module.exports=Service;