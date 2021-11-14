import React, { useEffect, useState } from 'react'
import {TextField,Button, Snackbar} from '@mui/material'
import Modal1 from './Modal1'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

function Service() {
  
  const[serachterm,setsearchTerm]=useState("")
  const[services,setservice]=useState([])
  const[name,setdname]=useState("");
  const[min,setMin]=useState("");
  const[max,setMax]=useState("");
  const[desc,setdesc]=useState("");
  const[rate,setdrate]=useState("");
  const[loading,setLoading]=useState(true)

 
    const fetchService =async () =>{
        try
        {
        let responce=await fetch('/fetchServicepage',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let service=await responce.json();
        setLoading(false)
        setservice(service)
        // console.log(service)
        if(responce.status==400 || responce.status==500)
        {
          <Snackbar
             open="true"
            message="Error :: Something went wrong" />
        }
           
        }
        catch(er)
        {
          <Snackbar
             open="true"
            message="Error :: Something went wrong" />
        }
        
    }

    useEffect(() => {
     
        fetchService();
    }, [])
    return (
        <div>
          {loading ? <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"400px"}}><CircularProgress/><p className="my-2">fetching your favourites...</p></div>:
            
              <div class="accordion my-3" id="accordionExample" >
               
                <ToastContainer/>
                <TextField className="my-3 w-50" onChange={(e)=>setsearchTerm(e.target.value)} size="small" id="outlined-basic" label="Search service" variant="outlined" />
              {services.filter((val)=>{
                if(serachterm=="")
                {
                  return val
                }
                else if(val.category.toLowerCase().includes(serachterm.toLocaleLowerCase()))
                {
                  return val
                }
               
              }).map((serv,ind)=>(
                
             services.length==0 ? <h1>No resul</h1> :  <div class="accordion-item" key={ind}>
             <h2 class="accordion-header" id="headingOne">
               <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${ind}`} aria-expanded="true" aria-controls="collapseOne">
                 {serv.category}
               </button>
             </h2>
             <div id={`#${ind}`} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
               <div class="accordion-body d-flex flex-row justify-content-between">
                 <p>{serv.name}</p>
                 <Button size="small" onClick={()=>{setMin(serv.min)
                 setMax(serv.max)
                  setdesc(serv.desc) 
                  setdname(serv.name)
                  setdrate(serv.rate)} } variant="outlined" data-toggle="modal" data-target="#exampleModal">View Details</Button>
               </div>
             </div>
             <Modal1 min={min} max={max} rate={rate} desc={desc} name={name}/>
         </div>
              ))}
            </div>
            }
        </div>
    )
}

export default Service
