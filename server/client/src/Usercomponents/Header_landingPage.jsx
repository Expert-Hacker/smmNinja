import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo1.png'
import '../header_landingpage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button,Tooltip,IconButton} from '@mui/material'
import Notifications from './Notifications';
function Header_landingPage(props) {
    const[show,setShow]=useState(false)
    const[balance,setBalance]=useState(0)
let log_status
useEffect(() => {
    
    authState();
}, [balance])
  
const authState=async()=>{
    let resp=await fetch('/authUser',{
      method:"GET",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include'
    })
    let data=await resp.json()
    setBalance(data[0].balance)
    
    
    
}
   
    const ToggleMenu = () =>{
        document.getElementById('dropMenu').classList.toggle('toggleclass')
    }
    const logout =async ()=>{
        localStorage.setItem('login_status',false);
        let resp= await fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:'include'
        })
      
    }
    function refresh()
    {
        authState()
    }
    function handleClose()
    {
        setShow(false)
    }
    function display()
    {
        setShow(true)
    }
    return (
        <div className={`position-${props.position} w-100`}>
        <div className="header ">
            <ToastContainer/>
            <ul className="d-flex justify-content-between container">
                <div>
                    <li><Link to="/v1/dashboard"><img className="logo" src={logo} alt="logo" height="60px" width="60px" className="bg-light"/></Link></li>
                </div>
                <div className="d-flex links my-auto">
                   {/* <div>
                   {localStorage.getItem('login_status')=="true" ? <h2>loged in</h2> :<p>some</p>}
                   </div> */}
                   
                <li className="d-flex m-auto">
                    <div>
                        <p className="p-0 m-0 balance">Available Funds:</p>
                        <p className="p-0  balanceNo d-flex mx-auto m-0 pl-1">{(balance.toFixed(2))}</p>
                    </div>
                    <p className="p-0 m-0"><Tooltip title="Refresh" placement="top"><IconButton size="small"><i class="fas fa-sync text-white ml-2 mt-2" onClick={refresh}></i></IconButton></Tooltip></p>
                </li>
                {/* <Tooltip title="Refresh" placement="top"><IconButton size="small"></IconButton></IconButton></Tooltip> */}
                    <li><i class="fas fa-bell" onClick={display}></i></li>
                    <li><i class="fas fa-user" id="user" onClick={ToggleMenu}></i></li>
                    <div className="dropMenu " id="dropMenu">
                        <p ><i class="fas text-white fa-address-card mr-2"></i><Link className="drpLink" to="/view-profile">View Profile</Link></p>
                        <p ><i class="far text-white fa-edit mr-2"></i><Link to="/edit-profile" className="drpLink">Edit Profile</Link></p>
                        <p ><i class="fas text-white fa-wallet mr-2"></i><Link className="drpLink" to="/v1/addfund">Add fund</Link></p>
                        <hr className="text-white"/>
                        <p ><Link to="#" onClick={logout} className="drpLink" to="/">Logout<i class="fas text-white fa-sign-out-alt ml-2"></i></Link></p>
                    </div>
                </div>
            </ul>
        </div>
        <Notifications show={show} handleClose={handleClose}/>
    </div>
    )
}

export default Header_landingPage
