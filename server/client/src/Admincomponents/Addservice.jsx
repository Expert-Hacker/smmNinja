import React, { useState } from 'react'
import {Modal,Form} from 'react-bootstrap'
import {TextField,Button} from '@mui/material'
function Addservice(props) {
    const[input,setInput]=useState({
        service:"",
        name:"",
        category:"",
        rate:"",
        min:"",
        max:"",
        desc:""
    })
    let namee,val;
    function handleInput(e)
    {
        namee=e.target.name;
        val=e.target.value;
        setInput({...input,[namee]:val})
    }
    const Createservice = async()=>{
        let{service,name,category,rate,min,max,desc}=input;
        let dripfeed=0;
        let type="Package"
        let resp=await fetch("/createService",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                service,name,category,rate,min,max,desc,dripfeed,type
            })
        })
        if(resp.status==201)
        {
            alert("Service Createcd")
        }
    }
    return (
        <div>
           <Modal show={props.show1} onHide={props.handleClose1}>
                <Modal.Header >
                    <Modal.Title>Add Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <TextField size="small" onChange={handleInput}  name="service" type="text" className="my-2" variant="outlined" label="Service No." fullWidth/>
                        <TextField size="small" onChange={handleInput} name="name" type="text" className="my-2" variant="outlined" label="Service Name" fullWidth/>
                        <TextField size="small" onChange={handleInput} name="category" type="text" className="my-2" variant="outlined" label="Category" fullWidth/>
                        <TextField size="small" onChange={handleInput} name="rate" type="number" className="my-2" variant="outlined" label="Rate" fullWidth/>
                        <TextField size="small" onChange={handleInput} name="min" type="number" className="my-2" variant="outlined" label="Minimum" fullWidth/>
                        <TextField size="small" onChange={handleInput} name="max" type="number" className="my-2" variant="outlined" label="Maximum" fullWidth/>
                        <TextField size="small"   type="text" value="Package" className="my-2" variant="outlined" label="Type" fullWidth/>
                        <textarea onChange={handleInput} name="desc" className="form-control my-2"  placeholder="Description" fullWidth/>
                        <TextField size="small"   type="number" value="0" className="my-2" variant="outlined" label="Dripfeed" fullWidth/>
                    </div>  
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={Createservice}>SUBMIT</Button>
                    <Button variant="primary" onClick={props.handleClose1}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Addservice
