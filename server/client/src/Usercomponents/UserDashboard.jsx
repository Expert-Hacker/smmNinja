import React, { useEffect, useState } from 'react'
import '../userDashboard.css'
import LinearProgress from '@mui/material/LinearProgress';
import {TextField,Button, Snackbar} from '@mui/material'

function UserDashboard() {
    const[open,setOpen]=useState(false)
    const[info,setInfo]=useState([])
    const[balance,setBalance]=useState(0)
    const[totalOrders,settotalorder]=useState(0)
    const[completed,setcomplted]=useState(0)
    const[pending,setpending]=useState(0)
    const[cancelled,setcancelled]=useState(0)
    const[loading,setLoading]=useState(true)
    const[ticket,setTicket]=useState(0)
    const[inprogress,setInprogress]=useState(0)
    useEffect(() => {
        const authState=async()=>{
            try {
                let resp=await fetch('/authUser',{
                    method:"GET",
                    headers:{
                      Accept:"application/json",
                      "Content-Type":"application/json"
                    },
                    credentials:'include'
                  })
                  let data=await resp.json();
                  console.log(data)
                 setBalance(data[0].balance);
            } catch (error) {
                setOpen(true)
            }
           
        }

        const totalorders=async()=>{
            let resp=await fetch('/fetchorder',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include'
            })
            let data=await resp.json();
            console.log(data)
           settotalorder(data.length) 
        }
        async function Inprogress()
        {
            let resp=await fetch('/filterby_inprogress',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            console.log(data)
            setInprogress(data.length)
        }
       async function completed()
        {
            let resp=await fetch('/completed',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            console.log(data)
            setcomplted(data.length)
        }
        async function pending()
        {
            let resp=await fetch('/filterby_pending',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            setpending(data.length)
        }

        async function cancelled()
        {
            let resp=await fetch('/filterby_cancelled',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            setcancelled(data.length)
            setLoading(false)
        }
    
          const fetchTickets =async () =>{
              let resp=await fetch('/fetchTickets',{
                  method:"GET",
                  headers:{
                      "Content-Type":"application/json"
                  }
              })
              let data= await resp.json();
              console.log(data)
              setTicket(data)
          }
          

        authState();
        totalorders();
        Inprogress();
        completed();
        pending();
        cancelled();
        fetchTickets();

    }, [])
 
    return (
        <div className="container overflow">
             {open ? <Snackbar
             open="true"
            message="Error :: Please Login" /> : ""}

            {loading ? <LinearProgress/> : ""}
            <div className="dashboard-header d-flex m-auto row justify-content-center">
                <div className="shadow rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                        <i class="fas fa-3x fa-money-bill-alt py-2"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Your balance</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{(balance.toFixed(2))}</p>
                   </div>
                </div>
                <div className="shadow rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-shopping-cart fa-3x py-2"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Total Orders</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{totalOrders}</p>
                   </div>
                </div>
                <div className="shadow rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-clock fa-3x"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">In Progress</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4 ">{inprogress}</p>
                   </div>
                </div>
                <div className="shadow rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-check fa-3x py-2 text-success"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1 pr-3">Completed</p>
                        <p className="h6 font-weight-bold dashboardnames  pb-4">{completed}</p>
                   </div>
                </div>
                <div className="shadow rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                        <i class="fas fa-lightbulb fa-3x py-2 text-warning"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Pending</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{pending}</p>
                   </div>
                </div>
                <div className="shadow rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                    <i class="far fa-times-circle fa-3x py-2 text-danger"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Cancelled</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{cancelled}</p>
                   </div>
                </div>
                <div className="shadow tickts_div_dashboard rounded d-flex flex-row col-sm  m-4">
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-ticket-alt fa-3x py-2 text-secondary"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Total Tickets</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{ticket.length}</p>
                   </div>
                </div>
                
            </div>
        </div>
    )
}

export default UserDashboard
