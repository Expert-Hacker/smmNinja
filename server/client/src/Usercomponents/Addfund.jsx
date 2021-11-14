import React, { useState } from 'react'
import Header_landingPage from './Header_landingPage'
import '../addfund.css'
import Razorpay from './Razorpay'
import Paytm from './Paytm'
function Addfund() {
    const[initval,setInitval]=useState("Razorpay")
   const navigate=()=>{
       console.log("switch")
    switch (initval) {
        case "Razorpay":
        return <Razorpay/>
            
        case "Paytm": 
        return <Paytm/>
        default:
            break;
    }
   }
    return (
        <div>
            <Header_landingPage/>
            <div className="container container1">
                <div className="d-flex flex-row">
                    <li className="linkss selected my-0" id="rozorpay1" onClick={()=>{setInitval("Razorpay");
                    document.getElementById('rozorpay1').classList.add('selected');
                    document.getElementById('paypal').classList.remove('selected')}}><i class="far fa-money-bill-alt mx-1"></i>Razorpay</li>

                    <li className="linkss my-0" id="paypal" onClick={()=>{setInitval("Paytm");
                document.getElementById('paypal').classList.add('selected');
                document.getElementById('rozorpay1').classList.remove('selected')}}><i class="far fa-money-bill-alt mx-1"></i>Paytm</li>
                    <li className="linkss disabled my-0"><i class="far fa-money-bill-alt mx-1"></i>PayUmoney</li>
                </div>   
            </div>
            <div className="container">
            {navigate()}
            </div>
          
        </div>
        
    )
    
}

export default Addfund
