import React, { useEffect } from 'react'
import {Button} from '@mui/material';
import {useHistory} from 'react-router-dom'
function Transaction_status() {
    let history=useHistory();

    useEffect(() => {
        const authState=async()=>{
            let resp=await fetch('/authUser',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include'
            })
            console.log(resp.status)
            if(resp.status==400)
            {
              history.push('/')
            }
           
        }
        authState();
    }, [])
    function goBack()
    {
        history.push("/v1/dashboard")
    }
    return (
        <div className="transaction_div">
            <div className="d-flex">
                <i class="fas text-success fa-2x tran_success fa-check-circle mr-1"></i>
                <h3 className="text-dark mt-auto mb-auto">Transaction Successfull</h3>
            </div>
            <Button variant="contained" className="mt-4" color="primary" onClick={goBack} size="small"><i class="fas fa-arrow-left mr-2"></i> GO BACK TO MAIN MENU</Button>
        </div>
    )
}  

export default Transaction_status
