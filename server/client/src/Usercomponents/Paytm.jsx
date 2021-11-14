import React, { useEffect } from 'react'
import qr from '../images/qr.jpg'
import GooglePayButton from '@google-pay/button-react';
function Paytm() {

      async function paynow(e)
      {
        e.preventDefault();
        let resp=await fetch('/order',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          }
        })
        let data=await resp.json();
        console.log(data)
      
      

    
    var options = {
      "key": "rzp_test_V8uihmtYMRDcfk", // Enter the Key ID generated from the Dashboard
      "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Acme Corp",
      "description": "Test Transaction",
      "order_id": data.id,
  
      "callback_url": "/check-payment-status",
      "theme": {
        "color": "#3399cc"
        }
    }
    var rzp1 = new window.Razorpay(options);


    rzp1.open();
   

}
  
    return (
        <div>
            <div>
                 <div>
                    <img src={qr} alt="QR code" height="650px" />
                </div>
                <div>
                    <h4>Instructions</h4>
                    <p>1. Scan Paytm barcode
                        2. Pay amount
                    3. Put amount & Transaction id
                    4. Click Submit button</p>
                </div>
            
            </div>
            <button onClick={paynow}>PAY</button>
            </div>
    )
}

export default Paytm
