import React, { useEffect, useState } from 'react'
import Header_landingPage from './Header_landingPage'
import '../viewprofile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
function Viewprofile() {
    const[loading,setloading]=useState(true)
    const[info,setInfo]=useState("")
    useEffect(() => {
       getprofileInfo();
    }, [])

   

    const getprofileInfo = async()=>{
        try {
            let resp=await fetch('/getprofileInfo',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:'include'
            })
            let data=await resp.json();
            setloading(false)
            setInfo(data[0])
        } catch (error) {
            toast.error('Something went wrong while fetching data', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                setloading(true)
        }
    }
    return (
        <div>
            <Header_landingPage/>
            <ToastContainer/>
            
            <div className="center">
            {loading ? <div className="d-flex flex-column justify-content-center align-items-center m-auto"><CircularProgress/><span className="my-2">Loading</span></div> : <div className="viewprofile">
                <div className="viewprheader text-center bg-success">
                    <h4 className="p-2 text-white myprfilr">  My profile</h4>
                </div>
                <div className="d-flex row_dy justify-content-around">
                    <div className="">
                        <li className="h5">Name</li>
                        <li className="h5">Email</li>
                        <li className="h5">Number</li>
                        <li className="h5">Joined on</li>
                        <li className="h5">User ID</li>
                    </div>
                    <div className="">
                        <li className="h5">{info.name}</li>
                        <li className="h5">{info.email}</li>
                        <li className="h5">{info.phone}</li>
                        <li className="h5">{info.createdAt}</li>
                        <li className="h5">{info._id}</li>   
                    </div>
                </div>
            </div>}
            </div>
        </div>
    )
}

export default Viewprofile
