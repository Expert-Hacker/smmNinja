import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../ticketlist.css'
import {LinearProgress, CircularProgress,Button} from '@mui/material'
import Viewticket from './Viewticket'
function TicketList() {
    const[loading,setLoading]=useState(true)
    const[ticket,setTicket]=useState([])
    const[ticketID,setTicketID]=useState("")
    const[show,setShow]=useState(false)
    useEffect(() => {
      fetchTickets();
    }, [ticket])
    const fetchTickets =async () =>{
        let resp=await fetch('/fetchTickets',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        console.log("tickerts", data)
        setLoading(false)
        setTicket(data)
    }
    function refresh()
    {
        fetchTickets();
    }
    function viewTickets(id)
    {
        setShow(true)
        setTicketID(id)
    }
    function hideit()
    {
        setShow(false)
    }

    // if(ticket.length>=1)
    // {
        return (
            
            <div className="ticket_header1">
               { show ? <Viewticket id={ticketID} hideit={hideit}/> :
                    loading ? <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"400px"}}><CircularProgress/><p className="my-2">Fetching your Tickets...</p></div> : 
                    <div>
                        <div className="d-flex flex-row ticket_header ticketlist">
                            <h4 className=" p-2"><i class="fas mr-2 fa-1x fa-ticket-alt"></i>My Tickets </h4>
                            <i class="fas ticket_refresh fa-sync-alt mr-2" onClick={refresh}></i>
                        </div>
                        {ticket.length>=1 ? <div>
                            <div className="py-2">
                            <span >Tickets: {ticket.length}</span>
                        </div>
                        <div>
                            {ticket.map((tick,indx)=>(
                                    <div className="d-flex shadow-sm ticket_list_bg my-2 flex-row" onClick={()=>viewTickets(tick._id)}>
                                        <div className="mt-auto pl-2 mb-auto ml-2">
                                            <i class="fas fa-2x fa-ticket-alt"></i>
                                        </div>
                                        <div className="d-flex ml-5 flex-column my-3">
                                            <div className="d-flex justify-content-between">
                                                <span className="subject_t">Subject: {tick.subject}</span>
                                                <Button className="font-weight-bold"  id="closeBtn" color="error" size="small" variant="text"><i class="fas mr-1 fa-1x fa-ticket-alt"></i>{tick.status}</Button>
                                            </div>
                                            <span>Ticket ID:{tick._id}</span>
                                        </div>  
                                    </div>
                                
                            ))}
                        </div>
                        </div> : <div>
                 <div className='allTickets d-flex flex-column'>
                    <h6><i class="far fa-3x fa-frown"></i></h6>
                     <h5>Look like you don't have ticket</h5>
                 </div>
                
             </div> }
                    </div>
                    
               }
            </div>
                
        )
    }


export default TicketList
