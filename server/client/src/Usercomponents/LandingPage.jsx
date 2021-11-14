import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../landingPage.css'
import Footer from './Footer'
import Header_landingPage from './Header_landingPage'
import Myorders from './Myorders'
import Neworder from './Neworder'
import Service from './Service'
import Support from './Support'
import UserDashboard from './UserDashboard'
import store from '../Redux/store'

function LandingPage() {
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
        console.log(resp.status)
        if(resp.status==400)
        {
          history.push('/')
        }
       
    }
    authState();
}, [])


    const[nav,setNav]=useState('dashboard')
    const decideNav = () =>{
        switch (nav) {
            case "dashboard":
                return <UserDashboard/>
            case "neworder":
                return <Neworder/>
            case "service":
                return <Service/>
            case "myorder":
                return <Myorders/>
            case "support":
                return <Support/>
            default:
                <h1>404 Error. page not found</h1>
        }
    }
    return (
        <div>
            <Header_landingPage postion="relative"/>
            <div className="container land">
                <div className="navigation d-flex justify-content-center shadow-lg">
                    <li className=' d-flex active' id="dash">
                        <a className="navigationLinks mx-auto" onClick={()=>{
                            document.getElementById('dash').classList.add('active')
                            document.getElementById('neword').classList.remove('active')
                            document.getElementById('serv').classList.remove('active')
                            document.getElementById('myord').classList.remove('active')
                            document.getElementById('supp').classList.remove('active')
                            setNav('dashboard')}}>Dashboard</a>
                    </li>
                    <li className=' d-flex' id="neword">
                        <a className="navigationLinks mx-auto" onClick={()=>{setNav('neworder')
                         document.getElementById('neword').classList.add('active')
                         document.getElementById('dash').classList.remove('active')
                            document.getElementById('serv').classList.remove('active')
                            document.getElementById('myord').classList.remove('active')
                            document.getElementById('supp').classList.remove('active')
                         }}>New Order</a>
                    </li>
                    <li className=' d-flex ' id="serv">
                        <a className="navigationLinks mx-auto" onClick={()=>{
                            document.getElementById('serv').classList.add('active')
                            document.getElementById('dash').classList.remove('active')
                            document.getElementById('neword').classList.remove('active')
                      
                            document.getElementById('myord').classList.remove('active')
                            document.getElementById('supp').classList.remove('active')
                            setNav('service')}}>Services</a>
                    </li>
                   
                    <li className=' d-flex' id="myord">
                        <a className="navigationLinks mx-auto" onClick={()=>{
                            document.getElementById('myord').classList.add('active')
                            document.getElementById('dash').classList.remove('active')
                            document.getElementById('neword').classList.remove('active')
                            document.getElementById('serv').classList.remove('active')
                          
                            document.getElementById('supp').classList.remove('active')
                            setNav('myorder')}}>My orders</a>
                    </li>
                    <li className=' d-flex' id="supp">
                        <a className="navigationLinks mx-auto" onClick={()=>{
                            document.getElementById('supp').classList.add('active')
                            document.getElementById('myord').classList.remove('active')
                            document.getElementById('dash').classList.remove('active')
                            document.getElementById('neword').classList.remove('active')
                            document.getElementById('serv').classList.remove('active')
                          
                            setNav('support')}}>Support </a>
                    </li>   
                </div>
                {decideNav()}
            </div>
            <Footer/>
        </div>
    )
}

export default LandingPage
