import React, { useState } from 'react'
import '../supportleft.css'
import TicketList from './TicketList'
import {Button,TextField}from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compose } from '@mui/system'
function Support() {
    const[disabled,setdisabled]=useState(true)
    const[subject,setSubject]=useState('order');
    const[request,setRequest]=useState("speed-up")
    const[orderID,setorderID]=useState("");

    const[orderIDerror,setorderIDerror]=useState(false);
    // const[serviceDesc,setserviceDesc]=useState("");
    // const[serviceDescerror,setserviceDescerror]=useState(false);

    const[Desc,setDesc]=useState("");
    const[Descerror,setDescerror]=useState(false);

    const[payment1,setpayment]=useState('')
    const[TransactionID,setTransactionID]=useState('');
    // const[paymentDesc,setpaymentDesc]=useState('')

    const[paymentError,setpaymentError]=useState(false)
    const[TransactionIDError,setTransactionIDError]=useState(false);
    // const[paymentDescError,setpaymentDescError]=useState(false)

    // const[otherDesc,setotherDesc]=useState("")
    // const[otherDescError,setotherDescError]=useState(false)

    const handleChange = (e) =>{
        setdisabled(false)
        if(e.target.value=="nill")
        {
            setdisabled(true)
        }
        console.log(e.target.value);
        setSubject(e.target.value)

        setorderIDerror(false)
        setDescerror(false)
        setDescerror(false)
        setpaymentError(false)
        setTransactionIDError(false)
        setDescerror(false)
        setDescerror(false)
        
    }
    const createTicketorder =async()=>{
       try {
        let resp=await fetch('/submitTicket',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                subject,request,orderID,desc:Desc
            })
        })
        if(resp.status==201)
        {
            toast.success('Ticket created successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                draggable: false,
                });   
        }
        else
        {
            toast.error('Unable to create ticket!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                });
        }
        console.log("subject: ",subject);
        console.log("request: ",request);
        console.log("order id: ",orderID);
        console.log("descr: ",Desc);
       } catch (error) {
            toast.error('Unable to create ticket!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                });
       }
    }
    const createTicketService =async()=>{
        try {
         let resp=await fetch('/submitTicket',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 subject,desc:Desc
             })
         })
         if(resp.status==201)
         {
             toast.success('Ticket created successfully!', {
                 position: "bottom-center",
                 autoClose: 3000,
                 draggable: false,
                 });   
         }
         else
         {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
         }
        } catch (error) {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
        }
        console.log("subject: ",subject);
        console.log("descr: ",Desc);
     }

     const createTicketPayment =async()=>{
        try {
         let resp=await fetch('/submitTicket',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 subject,desc:Desc,payment:payment1,transactionID:TransactionID
             })
         })
         if(resp.status==201)
         {
             toast.success('Ticket created successfully!', {
                 position: "bottom-center",
                 autoClose: 3000,
                 draggable: false,
                 });   
         }
         else
         {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
         }
        } catch (error) {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
        }
        console.log("subject: ",subject);
        console.log("payment: ",payment1);
        console.log("tran id: ",TransactionID);
        console.log("descr: ",Desc);
     }


     const setDescerrorOther =async()=>{
        try {
         let resp=await fetch('/submitTicket',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 subject,request,orderID,desc:Desc,payment:payment1,transactionID:TransactionID
             })
         })
         if(resp.status==201)
         {
             toast.success('Ticket created successfully!', {
                 position: "bottom-center",
                 autoClose: 3000,
                 draggable: false,
                 });   
         }
         else
         {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
         }
        } catch (error) {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
        }
     }


  



    const SubmitTicket=(e)=>
    {   
        if(subject=="order")
        {
            // let ress=document.getElementById('request').selectedIndex;
            if(!orderID)
            {
              return  setorderIDerror(true)
            }
            if(!Desc)
            {
             return   setDescerror(true)
            }
            // console.log("request",request)
            // console.log("subject",subject)//subject done
            // console.log("orderID", orderID)
            // console.log("order desc", Desc)
            createTicketorder();
            
        }
        else if(subject=="service")
        {
            
            if(!Desc)
            {
                return setDescerror(true)
            }
            // console.log("subject", subject) //service done
            // console.log("service desc", Desc);
            createTicketService();
        }
        else if(subject=="payment")
        {
            
            if(!payment1)
            {
                setpaymentError(true)
            }
            if(!TransactionID)
            {
                setTransactionIDError(true)
            }
            if(!Desc)
            {
                setDescerror(true)
            }
            // console.log("subject", subject);
            // console.log("payment mode", payment1);
            // console.log("transaction id", TransactionID)
            // console.log('transaction Desc', Desc)
            createTicketPayment();
        }
        else if(subject=="other")
        {
            if(!Desc)
            {
               return setDescerrorOther(true)
            }
            // console.log("othet desc subject", subject)
            // console.log("other desc", Desc)
            createTicketService();
        }
      
      
    }
   function handleRequestchange(e)
   {
       if(e.target.value=="nill")
       {
           setdisabled(true)
       }
        setRequest(e.target.value)
   }
   function handleOrderIDchange(e)
   {
        setorderID(e.target.value)
   }
  
   function handleDecrChgange(e)
   {
    setDesc(e.target.value)
   }
   function handlePayment(e)
   {
       setpayment(e.target.value)
   }
   function handleTransactionID(e)
   {
       setTransactionID(e.target.value)
   }
  
  
    return (
        <div>
            <div className="support my-3">
                <div className="row">
                    {/* <form action=""> */}
                <div className="col-sm">
                            <div>
                                <h4 className="p-2 addNewticket"><i class="fas mr-2 fa-1x fa-comments"></i>Add new Ticket</h4>
                            </div>
                            <div>
                                <h6>Subject</h6>
                                <select className="form-control my-3" id="subject" onChange={handleChange}>
                                    <option selected value="nill">Select Subject</option>
                                    <option  value="order">Order</option>
                                    <option  value="service">Service</option>
                                    <option value="payment">Payment</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            {
                                subject=="order" ? 
                                <div>
                                    <div className="my-3">
                                        <h6 >Request</h6>
                                        <select disabled={disabled} onChange={handleRequestchange} className="form-control" name="" id="request">
                                            {/* <option  value="nill">Select Request</option> */}
                                            <option  value="speed-up">Speed-up</option>
                                            <option value="refill">Refill</option>
                                            <option value="cancellation">Cancellation</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h6>Order ID</h6>
                                        <TextField placeholder="Please enter Order ID" error={orderIDerror} helperText={orderIDerror ? "This field cannot blank" : ""} disabled={disabled} value={orderID} required onChange={handleOrderIDchange} type="text" className="form-control" />
                                    </div>
                                    <div className="my-3">
                                        <h6>Description</h6>
                                        <TextField placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""} disabled={disabled} name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                        <Button disabled={disabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>SUBMIT</Button>
                                    </div>
                                </div> : subject=="service" ? 
                                <div className="my-3">
                                    <h6>Description</h6>
                                    <TextField placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""} disabled={disabled} name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={disabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>SUBMIT</Button>
                                </div> : subject=="payment" ? 
                                <div className="my-3">
                                    <h6>Payment</h6>
                                    <TextField onChange={handlePayment} disabled={disabled} value={payment1} error={paymentError} helperText={paymentError ? "This field cannot blank" : ""} placeholder="Please enter payment mode Eg: UPI/Card/Netbanking" type="text"  className="form-control my-3" />
                                    {/* <select disabled={disabled} name="" className="form-control my-3"  id="">
                                        <option value="">Paypal</option>
                                        <option value="">UPI</option>
                                    </select> */}
                                    <h6>Transaction ID</h6>
                                    <TextField placeholder="please enter Transaction ID" error={TransactionIDError} onChange={handleTransactionID} helperText={TransactionIDError ? "This field cannot blank" : ""} disabled={disabled} type="text"  className="form-control my-3" />
                                    <h6>Description</h6>
                                    <TextField placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""} disabled={disabled} name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={disabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>SUBMIT</Button>
                                </div>: 
                                <div>
                                    <h6>Description</h6>
                                    <TextField placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""} disabled={disabled} name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={disabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>SUBMIT</Button>
                                </div>
                            }
                </div>
                {/* </form> */}
                    <div className="col-sm">
                        <TicketList/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support
// subject=="service" ? 
//                                 : subject=="other" ?
//                                  <div>
//                                     <h6>Description</h6>
//                                     <textarea name="" className="form-control"  id="" cols="30" rows="10"></textarea>
//                                 </div> :