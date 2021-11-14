import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import TicketList from './TicketList'
import {Button,TextField} from '@mui/material'
function Tickets() {
    const[ticket,setticket]=useState("")
    const[Tickets,setTickets]=useState([])
    const[show,setShow]=useState(true)
    const[status,setstatus]=useState('All')
    useEffect(() => {
        fetchTicket();
    }, [])

    const fetchTicket =async()=>{
        let resp=await fetch('/fetchAllTickets',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setTickets(data)
        console.log(data);
    }
    function ticketlist(id)
    {
        setticket(id)
        setShow(false);
    }
    function handleClose()
    {
        setShow(true)
    }
    function refresh()
    {
        fetchTicket();
    }
    function handlechangge(e)
    {
        setstatus(e.target.value)
        fetchbystatus(e.target.value);
    }
    async function fetchbystatus(stat)
    {
        
        let resp=await fetch(`/fetchTicketBystatus/${stat}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        setTickets(data)
    }
    return (
        <div>
            {show ? <> <div className="d-flex justify-content-between my-2">
                <span>Showing Result of {Tickets.length} Tickets</span>
                <i class="fas fa-sync-alt mr-4 fa-2x" onClick={refresh}></i>
                <select onChange={handlechangge} className="w-25 form-control" name="" id="">
                    <option value="all">All</option>
                    <option value="Closed">Closed</option>
                    <option value="Not Answered">Not Answered</option>
                </select>
            </div>
           
            <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Ticket#</th>
                <th scope="col">User</th>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                
                    {Tickets.map((tick,inx)=>(
                        <tr>
                                <th scope="row">{inx+1}</th>
                                <td onClick={()=>ticketlist(tick._id)}>{tick._id}</td>
                                <td>{tick.user}</td>
                                <td>{tick.subject}</td>
                                <td>{tick.status}</td>
                                <td>{tick.date}</td>
                        </tr>
                    ))}
                
            </tbody>
            </table></> : <TicketList handleClose={handleClose} ticket={ticket}/>}
        </div>
    )
}

export default Tickets

