const mongoose= require('mongoose');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Userscheema= new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    cpassword:
    {
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default:0
    },
    createdAt:
    {
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        default:'user'
    },
    tokens:[
        {
            token:
            {
                type:String,
                required:true
            }
        }
    ]
})

Userscheema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})

Userscheema.methods.generateAuthtoken=async function()
{
    let gen_token=jwt.sign({id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:gen_token});
    this.save();
    return gen_token
}

const User= mongoose.model("User",Userscheema);

module.exports=User