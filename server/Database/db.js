const mongoose= require('mongoose');
const dotenv= require('dotenv')

dotenv.config({path:'.env'})

mongoose.connect(process.env.DB_URL)
.then(()=>console.log("DB Connection success"))
.catch((err)=>{
    console.log("DB connection not success")
})