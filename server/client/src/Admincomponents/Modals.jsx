import React, { useEffect, useState } from 'react'
 import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button, LinearProgress} from '@mui/material'
function Modals(props) {
   const[order,setOrder]=useState([])
   const[loading,setLoading]=useState(true)
   const[disabled,setDisabled]=useState(true)
   const[selected,setselected]=useState(false)

   const[stat1sele,setstate1]=useState(false)
   const[stat2sele,setstate2]=useState(false)
   const[stat3sele,setstate3]=useState(false)
   const[stat4sele,setstate4]=useState(false)
   const[stat5sele,setstate5]=useState(false)
   const[stat6sele,setstate6]=useState(false)

   const[selectedValue,setselectedValue]=useState("")
   useEffect(() => {
    fetchOrder();
   }, [])
  async function fetchOrder()
   {
    setstate1(false)
    setstate2(false)
    setstate3(false)
    setstate4(false)
    setstate5(false)
    setstate6(false)

  
    let resp= await fetch(`/findbyOrderID/${props.id}`,{
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }
    })
    let data=await resp.json();
    setDisabled(false)
    setLoading(false)
    setOrder(data)
    // alert(data.status)
   

   switch (data.status) {
       case "Ordered":
          return setstate1(true)
           break;
        case "Pending":
          return  setstate2(true)
            break;
        case "inprogress":
           return setstate3(true)
            break;
        case "cancelled":
           return setstate4(true)
            break;
        case "completed":
           return setstate5(true)
            break;
        case "cancelledandferunded":
           return setstate6(true)
            break;
            default:
                setstate1(false)
                setstate2(false)
                setstate3(false)
                setstate4(false)
                setstate5(false)
                setstate6(false)

   }
  
   }
   function refresh()
   {
       fetchOrder()
   }
   async function changeStatus(e)
   {
        setselectedValue(e.target.value)
        
   }
   async function updatedOrder()
   {
    let resp=await fetch(`/updateOrder/${props.id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            status:selectedValue
        })
    })
    if(resp.status==200)
    {
        toast.success('Update Successfull!', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            }); 
    }
   }
    return (
        <div>
             <Modal show={props.modalShow}>
                 <ToastContainer/>
                <Modal.Header >
                    <Modal.Title><p>Order: {props.id}</p></Modal.Title>
                    <p><i class="fas fa-redo" onClick={refresh}></i></p>
                </Modal.Header>
                {loading ? <LinearProgress/> : ""}
                <Modal.Body>
                    <p><span className="font-weight-bold text-info">ID</span>: {order._id}</p>
                    <p><span className="font-weight-bold text-info">Category</span>: {order.category}</p>
                    <p><span className="font-weight-bold text-info">Name</span>: {order.service}</p>

                    <select disabled={disabled} onChange={changeStatus} className="form-control w-75"  name="" id="">
                        <option selected={stat1sele} value="Ordered">Ordered</option>
                        <option selected={stat2sele} value="Pending">Pending</option>
                        <option selected={stat3sele} value="inprogress">Inprogress</option>
                        <option selected={stat4sele} value="cancelled">Cancelled</option>
                        <option selected={stat5sele} value="completed">Completed</option>
                        <option selected={stat6sele} value="cancelledandferunded">Cancelled & Refunded</option>
                </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={disabled} onClick={updatedOrder} variant="contained" color="primary" >
                        UPDATE
                    </Button>
                    <Button variant="secondary"  onClick={props.onHide}>
                    Close
                </Button>
                </Modal.Footer>
                
            </Modal>
          
        </div>
    )
}

export default Modals
