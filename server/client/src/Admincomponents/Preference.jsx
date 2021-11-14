import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
function Preference() {
    const[input,setinput]=useState("")
    const[curr,setcurr]=useState("")
    async function update()
    {
        if(input=="")
        {
            return alert("Field can't blank")
        }
        let resp=await fetch('/updateCurrency',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                currency:input
            })
        })
        if(resp.status==200)
        {
            toast.success('Currency updated Successfull!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
        let data=await resp.json();
        setinput(data.currency)
    }
    async function fetchCuerrencyDetails()
    {
        let resp=await fetch('/fetchcurrency',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }  
        })
        let data=await resp.json();
        setcurr(data.currency)
    }
    useEffect(() => {
      fetchCuerrencyDetails();
    }, [])

    function refresh()
    {
        fetchCuerrencyDetails()
    }
    return (
        <div>
            <ToastContainer/>
            <div className="mt-3 ml-3">
                    <i class="fas mb-3 fa-sync" onClick={refresh}></i>
                <h5>Update Currency (₹)</h5>
               <div className="d-flex flex-column w-25">
                    <span>Current currency ₹ {curr}</span>
                    <TextField onChange={(e)=>setinput(e.target.value)}  variant="outlined" size="small" className="mt-2"  type="text" />
                    <Button variant="contained" className="mt-2" onClick={update} color="success">SAVE</Button>
               </div>
            </div>
        </div>
    )
}

export default Preference
