import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import '../ad_dashboard.css'

function Dashboard() {
    const[userInfo,setuserInfo]=useState([])
    const[orderInfo,setorderInfo]=useState([])
    const[orderd,setOrderd]=useState([])
    const[pending,setPending]=useState([]);
    const[inprogrees,setinproess]=useState([])
    const[cancelled,setCanceled]=useState([])
    const[completed,setCompletdd]=useState([])
    const[cancelrefunded,setcancelrefunded]=useState([])
    const[loading,setLoading]=useState(true)
    const[ticket,setTickets]=useState([])
    
    useEffect(() => {
       fetchallUser();
       fetchOrderInfo();
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
       
    }

    async function fetchallUser()
    {
     let resp=await fetch('/fetchallUsers',{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
     })
     let data= await resp.json();
     setuserInfo(data)
    }

    async function fetchOrderInfo()
    {
     let resp1=await fetch('/fetchAllorders',{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
     })
     let data= await resp1.json();
     setorderInfo(data)

     let resp2=await fetch('/ad_filterby_ordered',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data2= await resp2.json();
    setOrderd(data2)

    let resp3=await fetch('/ad_filterby_pending',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data13= await resp3.json();
    setPending(data13)
    

    let resp4=await fetch('/ad_filterby_progress',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data4= await resp4.json();
    setinproess(data4)
    

    let resp5=await fetch('/ad_filterby_completed',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data5= await resp5.json();
    setCompletdd(data5)
    

    let resp6=await fetch('/ad_filterby_cancelled',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data6= await resp6.json();
    setCanceled(data6)
    

    let resp7=await fetch('/ad_filterby_cacelandrefunded',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data7= await resp7.json();
    setcancelrefunded(data7)
    setLoading(false)
    }

   
    return (
        <div className="ad_cards_div row">
            {loading ? <LinearProgress/> : ""}
            <div className="ad_cards1 col-sm shadow-sm">
                <h4><i class="fas fa-users p-2"></i> Users</h4>
                <p className="p-2">Total:{userInfo.length} </p>
            </div>
            <div className="ad_cards2 col-sm shadow-sm">
                <h4><i class="far fa-folder-open p-2"></i> Orders</h4>
                <p className="p-2">Total:{orderInfo.length} </p>
                <p className="p-2">Ordred:{orderd.length} </p>
                <p className="p-2">Pending:{pending.length} </p>
                <p className="p-2">In progress:{inprogrees.length} </p>
                <p className="p-2">Cancelled:{cancelled.length} </p>
                <p className="p-2">Completed:{completed.length} </p>
                <p className="p-2">Cancelled & Refunded:{cancelrefunded.length} </p>
            </div>
            <div className="ad_cards3 col-sm shadow-sm">
                <h4 className="p-2">Tickets: {ticket.length}</h4>
                <p className="p-2">Closed: </p>
                <p className="p-2">Not Answered: </p>
            </div>
        </div>
    )
}

export default Dashboard
