const mongoose=require('mongoose');

Orderscheema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    service:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Ordered"
    },
    orderedAt:{
        type:Date,
        default:Date.now
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Order=mongoose.model("Order",Orderscheema)

module.exports=Order;