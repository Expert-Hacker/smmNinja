import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import '../ad_landingPage.css'
import Dashboard from '../Admincomponents/Dashboard'
import Users from '../Admincomponents/Users'
import Orders from '../Admincomponents/Orders'
import Update from '../Admincomponents/Update'
import Service from '../Admincomponents/Service'
import Transactions from '../Admincomponents/Transaction_log'
import Tickets from './Tickets'
import { Link,useHistory } from 'react-router-dom'
import Preference from './Preference'

function Admin_landingPage() {
    const[option,setoption]=useState("dashboard");
    const history=useHistory()
    useEffect(() => {
        const authState=async()=>{
            let resp=await fetch('/authUser',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include'
            })
            
            if(resp.status==400)
            {
             return history.push('/')
            }
            if(resp.status==200)
            { 
                let dat=await resp.json();
                if(dat[0].role=='user')
                {
                    history.push('/')
                }
               
            }
           
        }
        authState();
    }, [])
    

    function displayOption()
    {
        switch (option) {
            case "dashboard":
                return <Dashboard/>
            case "users":
                return <Users/>
            case "orders":
                return <Orders/>
            case "update":
                return <Update/>
            case "service":
                return <Service/>
            case "transactions":
                 return <Transactions/>     
            case "tickets":
                return <Tickets/>
            case "preference":
                return <Preference/>
            default:
                <h1 className="text-danger">Not found!</h1>
        }
    }
    return (
      
        <div>
            <AdminHeader/>
            <div className="ad_landingpagediv1">
                <div className="ad_left shadow-lg">
                    <p className="text-center status my-3 h5">Status <i class="fas fa-circle text-success "></i></p>
                    <hr />
                    <div>
                        <li className="ad_options select_ad" id="dash_ad" onClick={()=>{setoption("dashboard");
                         document.getElementById('dash_ad').classList.add('select_ad')
                        document.getElementById('users_ad').classList.remove('select_ad')
                        document.getElementById('orders_id').classList.remove('select_ad')
                        document.getElementById('update_id').classList.remove('select_ad')
                        document.getElementById('serv_id').classList.remove('select_ad')
                        document.getElementById('ticket_id').classList.remove('select_ad')
                        document.getElementById('pref_id').classList.remove('select_ad')
                        document.getElementById('tran_id').classList.remove('select_ad')}}><i className='fas mr-2 fa-chart-line'></i> Dashboard</li>
                        
                        <li className="ad_options" id="users_ad" onClick={()=>{setoption("users");
                        document.getElementById('users_ad').classList.add('select_ad')
                        document.getElementById('dash_ad').classList.remove('select_ad')
                        document.getElementById('orders_id').classList.remove('select_ad')
                        document.getElementById('update_id').classList.remove('select_ad')
                        document.getElementById('serv_id').classList.remove('select_ad')
                        document.getElementById('pref_id').classList.remove('select_ad')
                        document.getElementById('ticket_id').classList.remove('select_ad')
                        document.getElementById('tran_id').classList.remove('select_ad')}}><i className='fas mr-2 fa-users'></i>Users</li>
                        
                        <li className="ad_options" id="orders_id" onClick={()=>{setoption("orders")
                    document.getElementById('users_ad').classList.remove('select_ad')
                    document.getElementById('dash_ad').classList.remove('select_ad')
                    document.getElementById('orders_id').classList.add('select_ad')
                    document.getElementById('update_id').classList.remove('select_ad')
                    document.getElementById('serv_id').classList.remove('select_ad')
                    document.getElementById('ticket_id').classList.remove('select_ad')
                    document.getElementById('pref_id').classList.remove('select_ad')
                    document.getElementById('tran_id').classList.remove('select_ad')}}><i className='fas mr-2 fa-luggage-cart'></i>Orders</li>
                        
                        <li className="ad_options" id="update_id" onClick={()=>{setoption("update")
                    document.getElementById('users_ad').classList.remove('select_ad')
                    document.getElementById('dash_ad').classList.remove('select_ad')
                    document.getElementById('orders_id').classList.remove('select_ad')
                    document.getElementById('update_id').classList.add('select_ad')
                    document.getElementById('serv_id').classList.remove('select_ad')
                    document.getElementById('pref_id').classList.remove('select_ad')
                    document.getElementById('ticket_id').classList.remove('select_ad')
                    document.getElementById('tran_id').classList.remove('select_ad')}}><i className='fas mr-2 fa-edit'></i>Update</li>
                        
                    <li className="ad_options" id="serv_id" onClick={()=>{setoption("service")
                document.getElementById('users_ad').classList.remove('select_ad')
                document.getElementById('dash_ad').classList.remove('select_ad')
                document.getElementById('orders_id').classList.remove('select_ad')
                document.getElementById('update_id').classList.remove('select_ad')
                document.getElementById('serv_id').classList.add('select_ad')
                document.getElementById('ticket_id').classList.remove('select_ad')
                document.getElementById('pref_id').classList.remove('select_ad')
                document.getElementById('tran_id').classList.remove('select_ad')}}><i className="fas mr-2 fa-list"></i>Services</li>
                        
                        <li className="ad_options" id="tran_id" onClick={()=>{setoption("transactions")
                    document.getElementById('users_ad').classList.remove('select_ad')
                    document.getElementById('dash_ad').classList.remove('select_ad')
                    document.getElementById('orders_id').classList.remove('select_ad')
                    document.getElementById('update_id').classList.remove('select_ad')
                    document.getElementById('serv_id').classList.remove('select_ad')
                    document.getElementById('ticket_id').classList.remove('select_ad')
                    document.getElementById('pref_id').classList.remove('select_ad')
                    document.getElementById('tran_id').classList.add('select_ad')}}><i className="fas mr-2 fa-clipboard-list"></i>Transactions</li>
                   
                   <li className="ad_options" id="ticket_id" onClick={()=>{setoption("tickets")
                document.getElementById('users_ad').classList.remove('select_ad')
                document.getElementById('dash_ad').classList.remove('select_ad')
                document.getElementById('serv_id').classList.remove('select_ad')
                document.getElementById('orders_id').classList.remove('select_ad')
                document.getElementById('update_id').classList.remove('select_ad')
                document.getElementById('ticket_id').classList.add('select_ad')
                document.getElementById('pref_id').classList.remove('select_ad')
                document.getElementById('tran_id').classList.remove('select_ad')}}><i class="fas mr-2 fa-ticket-alt"></i>Tickets</li>

                <li className="ad_options" id="pref_id" onClick={()=>{setoption("preference")
                document.getElementById('users_ad').classList.remove('select_ad')
                document.getElementById('dash_ad').classList.remove('select_ad')
                document.getElementById('serv_id').classList.remove('select_ad')
                document.getElementById('orders_id').classList.remove('select_ad')
                document.getElementById('update_id').classList.remove('select_ad')
                document.getElementById('pref_id').classList.add('select_ad')
                document.getElementById('ticket_id').classList.remove('select_ad')
                document.getElementById('tran_id').classList.remove('select_ad')}}><i class="fas mr-2 fa-tools"></i>Preferences</li>
                    </div>
                </div>
                <div className="ad_right users_ad">
                   { displayOption()}
                </div>
            </div>
        </div>
    )
}

export default Admin_landingPage
