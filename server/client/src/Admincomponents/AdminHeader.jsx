import React from 'react'
import '../ad_header.css'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import {TextField,Button,Tooltip,IconButton} from '@mui/material'
import {useHistory} from 'react-router-dom'
function AdminHeader() {
    const history=useHistory();
    async function logout()
    {
        try {
            let resp= await fetch('/logout',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:'include'
            })
            if(resp.status==200)
            {
                history.push("/")
            }
        } catch (error) {
            alert("unable to logout")
        }
    }
   
    return (
        <div className="ad_div1 shadow-lg">
       
            <div className="container d-flex justify-content-between ">
                <div className="ad_logo ">
                    <h5 className="m-0 p-3 text-white">Admin Dashboard</h5>
                </div>
                <div className="d-flex">
                    <div><p className="m-0 p-3 text-white">Hii admin</p></div>
                    <Tooltip title="Logout"><div ><p className="m-0 p-3"><i class="fas te fa-sign-out-alt" onClick={logout}></i></p></div></Tooltip>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
