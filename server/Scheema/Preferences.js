const mongoose=require('mongoose');

const Preferences=new mongoose.Schema({
    currency:{
        type:Number,
        required:true,
        default:75.16
    }
})
const Prefence=mongoose.model("Prefence",Preferences);

module.exports=Prefence;