import React, { useState } from 'react'
import payment from '../images/payment.png'
import {TextField,Button,Tooltip,Checkbox} from '@mui/material'
import payLogo from '../images/razorpay_logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Razorpay() {
  const[input,setInput]=useState("")
  const[error,setError]=useState(false)
  const[minamt,setminamt]=useState(false)
  const[disable,setDisable]=useState(false)
  function handlechange(e)
  {

    let value=e.target.value
    setInput(e.target.value)
  }
    async function paynow(e)
    {
      e.preventDefault();
      if(input=="")
      {
        setDisable(false)
        return setError(true)
      }
      if(input<5)
      {
        setDisable(false)
          return setminamt(true)
      }
     setDisable(true)
      let resp=await fetch('/order',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          amount:input
        })
      })
      let data=await resp.json();
      if(resp.status==400)
      {
        setDisable(false)
       return toast.error(`${data.resp}`, {
          position: "bottom-center",
          autoClose: 2000,
          draggable: false,
          
          });
          
      }
    
    

  
  var options = {
    "key": "rzp_test_V8uihmtYMRDcfk", // Enter the Key ID generated from the Dashboard
    "amount": "900000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "SMM SOLUTIONS",
    "description": "",
    "order_id": data.id,
    "handler": function (response){
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
  },
    // "callback_url": "/check-payment-status",
    "theme": {
      "color": "#3399cc"
      }
  }
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});
  rzp1.open();
}


    return (
        <div className="paymentscreen container bg-light shadow-lg rounded">
              <div className="payLogo">
                  <img src={payLogo} alt="Razorpay_logo" width="500px" className="my-3 img-fluid" />
                  
              </div>
              <div>
                    <p className="text-center">You can deposit funds with razorpay® they will be automaticly added into your account!</p>
                    <p className="text-center h6">It supports: Google Pay/PhonePay/Cards or QR & more Payment options</p>
              </div>
              <div className="d-flex">
                <TextField error variant="standard" onChange={handlechange} value={input} helperText={error ? "Field can't be blank" : minamt ?  "Amount must be greater than 5" : ""} label="Enter Amount (₹)" error={error}/>
                <Button disabled={disable} className="mt-auto" onClick={paynow} variant="contained" color="success">PAY NOW</Button>
              </div>
              <div className="mt-3">
                  <h6 className="ml-3">Note:</h6>
                  <li className="list_note">Minimal payment: ₹5</li>
                  <li className="list_note">Maximal payment: ₹20,000</li>
                  <li className="list_note">Clicking Return to Shop (Merchant) after payment successfully completed</li>
              </div>
              <div className="d-flex mb-3">
                  <Checkbox checked/> <p className="mt-3 h6">Yes, I understand after the funds added i will not ask fraudulent dispute or charge-back!</p>
              </div>
              
        </div>
    )
}

export default Razorpay


{/* <div className="bg-light shadow-lg paymentrozorpaydiv1 container my-2">
<h5 className="paymentrozorpay p-2 text-center rounded">You can pay using CARDS, UPI & MORE</h5>
<TextField variant="standard" onChange={handlechange} value={input} helperText={error ? "Field can't be blank" : ""} label="Enter Amount (₹)" error={error}/>
<Tooltip title="Click to select Payment options Like UPI/CARD/QR & More"><Button  onClick={paynow} variant="contained" color="success" className="my-3 paynow">PAY NOW</Button></Tooltip> 
<img src={payment} alt="payment" height="400px" width="400px" className="m-auto paymentImag img-fluid"/>

</div> */}