import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import '../users_ad.css'
import UserEditModal from './UserEditModal';
import moment from 'moment';
function Users() {
    const[users,setusers]=useState([]);
    const[input,setInput]=useState("")
    const[noUser,setNouser]=useState(false)
    const[loading,setOLaoding]=useState(true)
    const[id,setID]=useState("")
    const[show,setShow]=useState(false)
    const[role,setRole]=useState("")
    const[email,setEmail]=useState("")

    useEffect(() => {
      fetchAllUsers();
    }, [])
    async function fetchAllUsers()
    {
        let resp= await fetch('/fetchallUsers',{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setNouser(false)
        setOLaoding(false)
        setusers(data)
        console.log(data);
    }

    function hanleInput(e)
    {
       setInput(e.target.value)
    }

   async function search()
    {
        try {
            setOLaoding(true)
            if(input=="")
            {
                fetchAllUsers();
            }
            let resp=await fetch(`/searchuserByID/${input}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json()
            setusers(data)
            setOLaoding(false)
            setNouser(false)
            console.log("QUERY USERS",data)
            console.log("QUERY USERS status",resp.status)
            if(resp.status==400)
            {
                setNouser(true);
            }
        } catch (error) {
            setNouser(true);
            setOLaoding(false)
        }
    }

    async function searchbyEmail()
    {
        try {
            setOLaoding(true)
            if(email=="")
            {
                fetchAllUsers();
            }
            let resp=await fetch(`/searchUserbyEmail/${email}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json()
            setusers(data)
            setOLaoding(false)
            setNouser(false)
            console.log("QUERY USERS",data)
            console.log("QUERY USERS status",resp.status)
            if(resp.status==400)
            {
                setNouser(true);
            }
        } catch (error) {
            setNouser(true);
            setOLaoding(false)
        }
    }


    function editUser(id,role)
    {
        setID(id);
        setRole(role);
     
        setShow(true)
       
    }
    function handleClose(id)
    {
      
        setShow(false)
        
    }
    function refresh()
    {
        fetchAllUsers();
    }
    function hanleEmailInput(e)
    {
        setEmail(e.target.value)
    }


    return (
        <div className="users_ad">
            {loading ? <LinearProgress/> : ""}
            <div className="top_ad_user d-flex justify-content-between">
                <p className="p-3 h6">Showing Result of {users.length} Users</p>
                
                <div>
                    
                    <TextField onChange={hanleEmailInput} name="text" size="small" className="my-3 " label="Search by Email" variant="outlined"/>
                    <i class="fas my-3 mx-3 fa-2x fa-search" onClick={searchbyEmail}></i>
                </div>
                <div>
                    <i class="fas fa-sync-alt mr-4 fa-2x" onClick={refresh}></i>
                    <TextField onChange={hanleInput} name="text" size="small" className="my-3 " label="Search by User ID" variant="outlined"/>
                    <i class="fas my-3 mx-3 fa-2x fa-search" onClick={search}></i>
                </div>
            </div>
            <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">NAME</th>
                <th scope="col">ACTION</th>
                
                <th scope="col">EMAIL</th>
                <th scope="col">ROLE</th>
                <th scope="col">PHONE</th>
                <th scope="col">BALANCE</th>
                <th scope="col">ID</th>
                <th scope="col">CREATED AT</th>
                </tr>
            </thead>
            <tbody>
               
                 {noUser ? <h4 className="my-2 text-danger">We could't find any user with {input}</h4> : users.map((info,index)=>(
                     <tr>
                    <td>{index+1}</td>
                    <td>{info.name}</td>
                    <td><i class="far fa-edit" onClick={()=>editUser(info._id,info.role)}></i></td>
                    <td>{info.email}</td>
                    <td>{info.role}</td>
                    <td>{info.phone}</td>
                    <td>{info.balance}</td>
                    <td>{info._id}</td>
                    <td>{moment(info.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                    </tr>
                ))
                
                } 
            
            </tbody>
          
            </table>
            <UserEditModal show={show} handleClose={handleClose} role={role} id={id}/>
        </div>
    )
}

export default Users
