import React, { useEffect, useState } from 'react'

function TicketList(props) {
    const[input,setInput]=useState("")
    const[msgs,setMsgs]=useState([])
    const[ticket1,Setticet]=useState("")
    const fetchTickets =async () =>{
        let resp=await fetch(`/fetchTicket/${props.ticket}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        console.log(data)
        Setticet(data[0]);
        setMsgs(data[0].descs)

    }
    useEffect(() => {
        fetchTickets();
    }, [])
    function refresh()
    {
        fetchTickets();
    }
    const sendmessage =async()=>{
        let resp=await fetch(`/sendMessagebyAdmin/${props.ticket}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                desc:input
            })
        })
        let data=await resp.json();
        fetchTickets();
        if(resp.status==201)
        {
            alert("Message sent")
        }
    }
    function hangdleInput(e)
    {
        setInput(e.target.value)
    }
    return (
        <div>
            <div>
                <i class="fas fa-2x fa-arrow-circle-left" onClick={props.handleClose}></i>
            </div>
            <div className="tick_detils p-2">
                <p>Ticket ID: {ticket1._id}</p>
                <p>Subject: {ticket1.subject}</p>
                {ticket1.request=="" ? "" : <p>request :{ticket1.request}</p>}
                {ticket1.orderID==null ? "" : <p>Order ID: {ticket1.orderID}</p>}
                {ticket1.payment=="" ? "": <p>Payment method :{ticket1.payment}</p> }
                <p>Status: {ticket1.status}</p>
                {ticket1.transactionID==null ? "" : <p>Transaction ID: {ticket1.transactionID}</p>}
            </div>
            {msgs.map((msg,indx)=>(
                <div className="ad_tick_msg mt-2">
                    <p className="pl-2 py-1">{msg}</p>
                </div>
            ))}
            {ticket1.status=="Closed" ? <h4 className="text-danger font-weight-bold">THIS TICKET WAS CLOSED BY USER!</h4> : ""}
            <div>
                <textarea value={input} onChange={hangdleInput} className="form-control" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <button onClick={sendmessage}>SEND</button>
        </div>
    )
}

export default TicketList
