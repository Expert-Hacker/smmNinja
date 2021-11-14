const express= require('express');
const router= express.Router();
// const fetch=require('node-fetch')
// import fetch from 'node-fetch'
const User = require('../Scheema/userScheema')
const cors = require('cors');
const Service = require('../Scheema/serviceScheema');

const bcrypt=require('bcryptjs')
const generateAuthtoken=require('../Scheema/userScheema');
const authenticateUser = require('../auth');
const checksum_lib=require('../paytm/paytm/lib/checksum')
const Rozarpay=require('razorpay');
const uniqueId=require('uniqid');
const Order = require('../Scheema/orderScheema');
const Preference=require('../Scheema/Preferences');
const Ticket =require('../Scheema/TicketScheema');
const Message = require('../Scheema/messageScheema');


router.use(express.urlencoded({
    extended: true
  }));
const razorpay=new Rozarpay({
    key_id:"rzp_test_V8uihmtYMRDcfk",
    key_secret:"750TkJKKXnVDJg9LuCn6xKIh"
})

router.post('/order',(req,res)=>{
    let amt=req.body.amount;
    let format=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(format.test(amt))
        {
            return res.status(400).send({resp:"Invalid Amount"})
        }

    let options={
        amount:req.body.amount*100,
        currency:"INR",
        receipt:uniqueId()
    }
    razorpay.orders.create(options,(err,order)=>{
       
        res.send(order)
    })
    
})


router.post('/register',async (req,res)=>{
    try
    {
        const {name,email,phone, password,cpassword}=req.body;

        let resp=await User.findOne({email:email})
        if(resp)
        {
            return  res.status(400).send({resp:"This email ID already exist"}) //done
        }
        if(phone.trim().length<10 || phone.trim().length>10)
        {
            return  res.status(400).send({resp:"Please enter valid phone number(without +91)"})
        }

        if(!isNaN(name.trim()))
        {
            return res.status(400).send({resp:"Invalid Name"})
        }
        let format=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(format.test(name))
        {
            return res.status(400).send({resp:"Invalid Name"})
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail)
        {
          return  res.status(400).send({resp:"Please enter valid emial ID"})
        }

        if(!name || !email || !phone || ! password || !cpassword)
        {
            return  res.status(400).send({resp:"Please fill all the inputs"}) 
        }
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        
        if(!strongPassword.test(password))
        {
            return res.status(400).send({resp:"Your Password is very weak 😒"})
        }

        if(password!==cpassword)
        {
            return  res.status(400).send({resp:"Both passwords should be matched"}) //done
        }
        else
        {
            let result=new User({
                name,email,phone, password,cpassword
            })
            //hash password
            await result.save();
           
            res.status(201).send(result)
        }
    }catch(err)
    {
        return  res.status(400).send({resp:"This email ID already exist"})
    }
})
    
router.post('/login',async(req,res)=>{
    try {
        const{email,password}=req.body;
                let user=await User.findOne({email})
               let hashedPasswrd = await bcrypt.compare(password,user.password)
               
                if(user.email)
                {
                    
                    if(hashedPasswrd)
                    {
                       
                        let gen_token=await user.generateAuthtoken();
                        res.cookie('USER_AUTH_LOG',gen_token)
                        res.status(200).send(user)
                    }
                    else
                    {
                        res.status(400).send(user)
                    }
                }
                else
                {
                    res.status(400).send(user)
                }


    } catch (error) {
        res.status(400).send("Invalid Credentials")
    }
})
//bulk add
router.post('/addServiceeee',async(req,res)=>{
   

    for(let i=0;i<=services.service.length;i++)
    {
        let resp=await new Service({
            service: services.service[i].service,
            name: services.service[i].name,
            category: services.service[i].category,
            rate: services.service[i].rate,
            min: services.service[i].min,
            max: services.service[i].max,
            type: "package",
        desc: services.service[i].desc,
        dripfeed: 0 
        })
        await resp.save();
    }
    
    res.status(201).send("Service Added to DataBase")
})
router.get('/fetchService',async(req,res)=>{
    let resp=await Service.distinct("category");
//  let resp=await Service.find({});
    res.status(200).send(resp)
})  
router.get('/fetchServicepage',async(req,res)=>{
  try {      
        let resp=await Service.find({})
        res.status(200).send(resp)
  } catch (error) {
      res.status(400).send("Unable to fetch service")
  }
}) 

router.get('/fetchServiceByDeatemodified',async(req,res)=>{
    // let resp=await Service.distinct("category");
 let resp=await Service.find().sort({createdAt:-1})
    res.status(200).send(resp)
}) 

router.get('/fetchserviceName/:id',async(req,res)=>{
    let category=req.params.id;
    
    const resp=await Service.find({category:category});
    res.status(200).send(resp)
})

router.get('/fetchName/:id',async(req,res)=>{
    let name=req.params.id;

    const resp=await Service.find({name:name});
    res.status(200).send(resp)
})
router.get('/logout',(req,res)=>{
    res.clearCookie('USER_AUTH_LOG');
    res.status(200).send("Logout success")
})
router.get('/authUser',authenticateUser,(req,res)=>{
    res.send(req.root_user)
})
router.get('/getprofileInfo',authenticateUser,(req,res)=>{
 
    res.send(req.root_user)
})

router.put('/updateuser',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let {name,email,phone}=req.body;
    let resp=await User.findByIdAndUpdate({_id:user_id},{name,email,phone},function(err,doc){
        if(err)
        {
            console.log('update failed')
        }
        else
        {
            res.status(200).send("updated")
        }
    });
    
})

router.post('/check-payment-status',authenticateUser,async(req,res)=>{
  try
  {
    let user_id=req.root_user[0]._id.toString();
    let prev_balance=req.root_user[0].balance.toString();
    console.log("user id", user_id)
    let respp=await razorpay.payments.fetch(req.body.razorpay_payment_id);
        
        if(respp.status=="captured")
        {
            console.log("payment successfull");
            let balance=respp.amount/100;
            let total=Number(prev_balance)+Number(balance);
           
            console.log("balance", balance)
           
            let resp= User.findByIdAndUpdate({_id:user_id},{balance:total},function(err,doc){
                if(err)
                {
                    console.log('update failed')
                }
                else
                {    
                  return  res.redirect("/transaction-status")
                }
            }); 
        }
        else
        {
            console.log("payment not successfull")
            res.status(400).send("Payment not successfull!");
        }
  }catch(err)
  {
    res.status(400).send("Something went wrong while payment");
  }

})
router.post('/createorder',authenticateUser,async(req,res)=>{
   try {
    
        let user_id=req.root_user[0]._id.toString();
        let {category,service,link,qty,price,total}=req.body;

        let prev_balance=req.root_user[0].balance.toString();
        let updated_balance=Number(prev_balance)-Number(total);

        let resp=await new Order({
            category,service,link,qty,price,total,user:user_id
        })
        
        resp.save();
        let update_doc= User.findByIdAndUpdate({_id:user_id},{balance:updated_balance},function(err,doc)
        {
            if(err)
            {
                console.log("error while updating balance")
            }
            else
            {
                console.log("balance updated")
            }
        })
        
        res.status(201).send(resp)
   } catch (error) {
       res.status(400).send("Unable to create order!")
   }
})

router.get('/fetchorder',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp=await Order.find({user:user_id});
    res.status(200).send(resp)
    
})

router.get('/filterby_ordered',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'Ordered'})
    res.status(200).send(resp)
})
router.get('/filterby_pending',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'Pending'})
    res.status(200).send(resp)
})
router.get('/filterby_inprogress',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'inprogress'})
    res.status(200).send(resp)
})
router.get('/filterby_cancelled',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'cancelled'})
    res.status(200).send(resp)
})
router.get('/filterby_cancelledandrefunded',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'cancelledandferunded'})
    res.status(200).send(resp)
})
router.get('/completed',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'completed'})
    res.status(200).send(resp)
})
router.get("/fetchallUsers",authenticateUser,async(req,res)=>{
   try {
    let resp=await User.find().sort({createdAt:-1})
    res.status(200).send(resp)
   } catch (error) {
       res.status(400).send("unable to fetch all users")
   }
})

router.get("/fetchAllorders",authenticateUser,async(req,res)=>{
    try {
     let resp=await Order.find().sort({orderedAt:-1})
     res.status(200).send(resp)
    } catch (error) {
        res.status(400).send("unable to fetch all oredrs")
    }
 })

 router.get("/fetchTicketBystatus/:id",authenticateUser,async(req,res)=>{
     try {
        let status=req.params.id
        let resp= await Ticket.find({status});
        res.status(200).send(resp)
     } catch (error) {
         res.status(400).send("ticket not found")
     }
 })


 router.get('/fetchAllorders/:id',authenticateUser,async(req,res)=>{
     let ord_status=req.params.id;
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({status:ord_status})
    res.status(200).send(resp)
})
router.get('/searchuserByID/:id',authenticateUser,async(req,res)=>{
   try {
    let user_id=req.params.id

    // let resp= await User.findOne({'name': {'$regex': `${user_id}`, '$options': 'i'}})
    // let resp= await User.findOne({$or: [{'name': {'$regex': `${user_id}`, '$options': 'i'}},{'email': {'$regex': `${user_id}`, '$options': 'i'}}]})
    resp= await User.findOne({$or: [{name:`${user_id}`},{email:`${user_id}`},{_id:`${user_id}`}]})
    if(!resp)
    {
      return  res.status(400).send("No users found")
    }
    res.status(200).send([resp])
   } catch (error) {
       res.status(400).send(["User not found"])
       
   }
})

router.get('/searchUserbyEmail/:id',authenticateUser,async(req,res)=>{
    try {
     let user_id=req.params.id
 
     // let resp= await User.findOne({'name': {'$regex': `${user_id}`, '$options': 'i'}})
     // let resp= await User.findOne({$or: [{'name': {'$regex': `${user_id}`, '$options': 'i'}},{'email': {'$regex': `${user_id}`, '$options': 'i'}}]})
     resp= await User.findOne({email:user_id})
     if(!resp)
     {
       return  res.status(400).send("No users found")
     }
     res.status(200).send([resp])
    } catch (error) {
        res.status(400).send(["User not found"])
        
    }
 })

router.get('/ad_filterby_ordered',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'Ordered'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_cacelandrefunded',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'cancelledandferunded'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_pending',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'Pending'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_progress',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'inprogress'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_completed',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'completed'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_cancelled',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'cancelled'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})

router.get('/findbyOrderID/:id',authenticateUser,async(req,res)=>{
    let order_id=req.params.id
    let resp= await Order.findById({_id:order_id})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    console.log("res",resp)
    res.status(200).send(resp)
})

router.post('/updateOrder/:id',authenticateUser,(req,res)=>{
    let or_id=req.params.id;
    let status=req.body.status;
    let resp=  Order.findByIdAndUpdate({_id:or_id},{status},function(err,doc){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).send("doc updated")
        }
    })
   
})
router.post('/updateCurrency',authenticateUser,async(req,res)=>{
    let curr=req.body.currency;
    let resp= await Preference.findByIdAndUpdate({_id:"6176aca0bc02494fcdf1b83e"},{currency:curr},function(err,doc){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).send(doc)
        }
    })
})
router.get('/fetchcurrency',authenticateUser,async(req,res)=>{
   
    let resp= await Preference.findById({_id:"6176aca0bc02494fcdf1b83e"})
   
    res.status(200).send(resp)
})


router.get('/fetchservicebynumber/:id',authenticateUser,async(req,res)=>{
    let ser_id=req.params.id
    let resp= await Service.find({service:ser_id})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    console.log("res",resp)
    res.status(200).send(resp)
})

router.get('/searchsingleuserByID/:id',authenticateUser,async(req,res)=>{
    try {
     let user_id=req.params.id
    
 
     // let resp= await User.findOne({'name': {'$regex': `${user_id}`, '$options': 'i'}})
     let resp= await User.findById({_id:user_id})
     if(!resp)
     {
       return  res.status(400).send("No users found")
     }
     res.status(200).send([resp])
    } catch (error) {
        res.status(400).send(["User not found"])
        
    }
 })

 router.delete("/deleteOrder/:id",authenticateUser,async(req,res)=>{
    let ord_id=req.params.id;
    let resp=await Order.deleteOne({_id:ord_id});
    res.status(200).send(resp);
 })

 router.put("/update-user/:id",authenticateUser,(req,res)=>{
     let usr_id=req.params.id;
     let role=req.body.role;
     let balance=req.body.up_balance;
     console.log(usr_id)
     console.log(role)
     console.log(balance)

     let resp=User.findByIdAndUpdate({_id:usr_id},{role,balance},function(err,doc){
         if(err)
         {
              console.log("unable to update user")
         }
         else
         {
             console.log("updated", doc)
             res.status(200).send(doc)
         }
     })
 })
 router.put("/updateService/:id",authenticateUser,(req,res)=>{
    let serv_id=req.params.id;
    let {name,category,rate,min,max,desc}=req.body;


    let resp=Service.findOneAndUpdate({service:serv_id},{name,category,rate,min,max,desc},function(err,doc){
        if(err)
        {
             console.log("unable to update service")
        }
        else
        {
            console.log("updated service", doc)
            res.status(200).send(doc)
        }
    })
})

router.delete("/deleteservice/:id",authenticateUser,async(req,res)=>{
    let serv_id=req.params.id;
    let resp=await Service.deleteOne({service:serv_id});
    console.log("deleted service", resp)
    res.status(200).send(resp);
 })
 

 /* --------------------------------- TICKETS -------------------------------- */
 router.post("/submitTicket",authenticateUser,async(req,res)=>{
  
       try {
            let user=req.root_user[0]._id.toString();
            let role=req.root_user[0].role.toString();
            let name=req.root_user[0].name.toString();
            let {subject,request,orderID,desc,payment,transactionID}=req.body;
            let resp=await new Ticket({
                subject,
                request,
                orderID,
                payment,
                transactionID,
                user,
                role,
                name 
            })
            resp.descs.push(desc)
            resp.save();
            res.status(201).send(resp)
       } catch (error) {
           res.status(400).send("Unable to create ticket")
       }
 })

router.post("/sendMessage/:id",authenticateUser,async(req,res)=>{
   try {
       let desc=req.body.desc;
       let id=req.params.id;
    let resp1=await Ticket.findOneAndUpdate({_id:id},{$push:{descs:desc}    
    });
    res.status(201).send(resp1)
  
   } catch (error) {
       res.status(400).send("Unable to send mesage")
   }
})


router.post("/sendMessagebyAdmin/:id",authenticateUser,async(req,res)=>{
    try {
        let desc=req.body.desc;
        let tik_id=req.params.id;
        let resp1=await Ticket.findOneAndUpdate({_id:tik_id},{$push:{descs:desc}, status:"Answered",
    });
        res.status(201).send(resp1)
   
    } catch (error) {
        res.status(400).send("Unable to send mesage")
    }
 })
      
      


 router.get("/fetchTickets",authenticateUser,async(req,res)=>{
     let user=req.root_user[0]._id.toString();
     let resp= await Ticket.find({user});
     res.status(200).send(resp);
 })
 router.get("/fetchTicket/:id",authenticateUser,async(req,res)=>{
    let user=req.root_user[0]._id.toString();
    let ticket=req.params.id;

    let resp= await Ticket.find({_id:ticket});
    res.status(200).send(resp);
})
// router.post("/sendMessage/:id",authenticateUser,async(req,res)=>{
//     let ticket=req.params.id;
//     let message=req.body.desc;
//     let role=req.root_user[0].role.toString();
//     let name=req.root_user[0].name.toString();
  
//     let user=req.root_user[0]._id.toString();
//     let resp=await new Message({
//         message,user,ticketid:ticket,role,name
//     })
//     resp.save();
//     res.status(201).send(resp)  
// })

router.get("/fetchMessage/:id",authenticateUser,async(req,res)=>{
    let user=req.root_user[0]._id.toString();
    let ticket=req.params.id;

    let resp= await Message.find({ticketid:ticket});
    res.status(200).send(resp);
})

router.get("/fetchAllTickets",authenticateUser,async(req,res)=>{
    // let user=req.root_user[0]._id.toString();
    // let ticket=req.params.id;
    let resp= await Ticket.find({});
    res.status(200).send(resp);
})
router.post("/createService",authenticateUser,async(req,res)=>{
    try {
            let{service,name,category,rate,min,max,desc,dripfeed,type}=req.body;
        let resp=await new Service({
            service,name,category,rate,min,max,desc,dripfeed,type
        })
        resp.save();
        res.status(201).send(resp)
    } catch (error) {
        res.status(400).send("Unable to create service")
    }
})
router.put('/updateTicketstatus/:id',authenticateUser,(req,res)=>{
    try {
        let id=req.params.id
        let status=req.body.status;
        let resp=Ticket.findByIdAndUpdate({_id:id},{status:status},function(err,doc){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).send(doc)
        }
    })
    } catch (error) {
        res.status(400).send("not able to update status")
    }
})

module.exports=router;

// https://cors-anywhere.herokuapp.com/https://followerskart.in/api/v1/?key=uuqVyF1wgnqgrBH3IDXf41NRlS8S4PhM&action=services