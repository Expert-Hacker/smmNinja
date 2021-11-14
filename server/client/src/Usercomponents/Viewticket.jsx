import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, TextField} from '@mui/material'
import moment from 'moment';
function Viewticket(props) {
    const[disabled,setDisabled]=useState(false)
    const[loading,setLoading]=useState(true)
    const[message,setMessage]=useState([])
    const[input,setInput]=useState("")
    const[details,setDetails]=useState([])
    const[msgError,setmsgError]=useState(false)
    const[clsBtn,setclsbtn]=useState(false)
    useEffect(() => {
       getticketDetails();
       fetchMessages();
    }, [])
async function getticketDetails()
{
    let resp=await fetch(`/fetchTicket/${props.id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data=await resp.json();
    setDetails(data)
    setLoading(false)
    console.log("data", data);
    if(data[0].status=="Closed")
    {
        setDisabled(true)
    }
}
async function fetchMessages()
{
    let resp=await fetch(`/fetchMessage/${props.id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data=await resp.json();
    setLoading(false)
    setMessage(data)
}
function handlechange(e)
{
    setInput(e.target.value)
}
const sendMessage =async()=>{
    if(!input)
    {
        return setmsgError(true)
    }
    let resp=await fetch(`/sendMessage/${props.id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            desc:input
        })
    })
    let data=await resp.json();
    setInput("")
    getticketDetails();
   
    if(resp.status==201)
    {
        toast.success('Message sent Successfully', {
            position: "bottom-center",
            autoClose: 3000,
            draggable: false,
            }); 
    }
    else
    {
        toast.error('Message not sent', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            }); 
    }

}
function refresh()
{
    getticketDetails();
}
const updateTicketstatus =async()=>{
    try {
        setclsbtn(true)
        let resp=await fetch(`/updateTicketStatus/${props.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:"Closed"
            })
        })
        if(resp.status==200)
        {
            setDisabled(true)
            document.getElementById('closeBtn').innerHTML=`<i class="fas mr-2 fa-1x fa-ticket-alt"></i>Closed`
            setclsbtn(false)
        }
    } catch (error) {
        toast.error('Unable to close this Ticket, please contact support', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            }); 
            setclsbtn(false)
    }
}

    return (
        <div>
            <div className="view-ticket d-flex flex-row justify-content-between">
                <h4 className="p-2"> <i class="fas fa-1x mr-2 fa-arrow-circle-left" onClick={props.hideit}></i> View ticket</h4>
                <i class="fas ticket_refresh fa-sync-alt mr-2" onClick={refresh}></i>
            </div>
        {loading ? <h4 className="my-5 text-center">Loading...</h4> :
            <div>
                {details.map((tick,indx)=>(
                    <>
                    <div className="tick_detils p-2 mt-2">
                        <div><p className="ttick_info font-weight-bold">Ticket ID: </p>{tick._id}</div>
                        <div><p className="ttick_info font-weight-bold">Subject: </p> {tick.subject}</div>
                        <div>{tick.request== "" ? "" : <p className="ttick_info font-weight-bold">request :</p>}{tick.request}</div>
                        <div>{tick.orderID==null ? "" : <p className="ttick_info font-weight-bold">Order ID: </p>}{tick.orderID}</div>
                        <div>{tick.payment=="" ? "": <p className="ttick_info font-weight-bold">Payment method :</p> }{tick.payment}</div>
                        
                        <div>{tick.transactionID==null ? "" : <p className="ttick_info font-weight-bold">Transaction ID: </p>}{tick.transactionID}</div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="ttick_info font-weight-bold">Status: </p>{tick.status}        
                            </div>
                            <div>
                                <Button disabled={clsBtn} onClick={updateTicketstatus} id="closeBtn" color="error" size="small" variant="outlined"><i class="fas mr-2 fa-1x fa-ticket-alt"></i>{tick.status=="Not Answered" ? "CLOSE TICKET" : tick.status=="Closed" ? "CLOSED" : tick.status=="Answered" ? "CLOSE TICKET" : "CLOSE"}</Button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {tick.descs.map((msgs,indx)=>(
                            <div>
                                {msgs.includes("support") ? <div className="d-flex my-4 ">
                                    <div className="mb-auto">
                                        
                                            <i class="fas fa-2x tick_admn fa-headset mr-2"></i> 
                                        
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="ad_tcket_div  my-0">
                                            <span className="user_tcket  msg_font">{msgs}</span>
                                        </div>
                                        <div className="tick_name_date">
                                            <span className="msg_name">Support</span>
                                            <span className="msg_date">{tick.date}</span>
                                        </div>
                                    </div>
                                </div> : <div className="d-flex my-4 ">
                                    <div className="mb-auto">
                                         <i class="fas fa-2x tick_usr fa-user mr-2"></i> 
                                        
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="user_tcket_div  my-0">
                                            <span className="user_tcket  msg_font">{msgs}</span>
                                        </div>
                                        <div className="tick_name_date">
                                            <span className="msg_name">{tick.name}</span>
                                            <span className="msg_date">{moment(tick.date).format("dddd, MMMM Do YYYY, h:mm a")}</span>
                                        </div>
                                    </div>
                                </div> }
                                    
                            </div>
                        ))}
                        
                    </div>
                    
                    </>
                ))}
            </div>
}

            <div className="mt-5 mb-2" >
                <TextField disabled={disabled} className="form-control" value={input} onChange={handlechange} name=""  id="msg" cols={30} rows={2} helperText={msgError ? "Please fill this field" : ""} error={msgError} multiline></TextField>
                <Button disabled={disabled} color="success" variant="contained" className="my-2" onClick={sendMessage}>SEND</Button>
            </div>
           
        </div>
    )
}

export default Viewticket
