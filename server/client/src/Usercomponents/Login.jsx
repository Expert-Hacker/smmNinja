import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import Header_home from './Header_home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
let validator = require("email-validator");


function Login() {
    const[disable,setDisable]=useState(false)
  const[loading,setLoading]=useState(false);
    const[emilerr,setemailerr]=useState(false)
    const[passerr,setpasserr]=useState(false)
    const history=useHistory()
    const[input,setInput]=useState({
        email:"",
        password:""
    })
    let name, value;
    function handleChange(e)
    {
        name=e.target.name;
        value=e.target.value
        setInput({...input,[name]:value})
    }
  
    async function login(e)
   {
     
        localStorage.setItem('login_status',true)
        let {email,password}=input;
        if(!email)
        {
            setemailerr(true)
        }
        if(!password)
        {
            setpasserr(true)
        }
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail(input.email))
        {
            setemailerr(true)
        }
        if(validator.validate(email))
        {
                try {
                    setDisable(true)
                    setLoading(true)
                    let res= await fetch('/login',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,password
                        })
                    })
                    
                    let resp= await res.json();
                    console.log(resp.role)
                    if(res.status==200 && resp.role=="user")
                    {
                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1/dashboard")
                            },4000)
                    }
                    if(res.status==200 && resp.role=="admin")
                    {
                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1/admin-dashboard")
                            },4000)
                    }
                    if(res.status==400)
                    {
                        setLoading(false)
                        setDisable(false)
                        toast.error('Invalid Credentials!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                    }
                } catch (error) {
                    setLoading(false);
                    setDisable(false)
                    toast.error('Invalid Credentials!', {
                        position: "bottom-center",
                        autoClose: 3500,
                        draggable: false,
                        }); 
                    
                }
        }

   }


    return (
        <div>
            
            <Header_home postion="relative"/>
            
            <div className="m-auto container">
            {loading ? <LinearProgress/> :""}
                <ToastContainer/>
                <div className="title">
                    <h3>Login</h3>
                </div>
                <div className="controls">
                   <form action="">
                    <div  className="my-3 d-flex flex-row ">
                    <i className="fa icons fa-envelope mr-2"></i>
                            <TextField disabled={disable} error={emilerr} helperText={emilerr ? "Email is Required" : ""}  id="standard-basic" type="text" label="Your Email" name="email" variant="standard" value={input.email} onChange={handleChange} type="email"  fullWidth/>
                        </div>
                        <div  className="my-3 d-flex flex-row ">
                        <i className="fas icons mr-2 fa-key"></i>
                            <TextField disabled={disable}  error={passerr} helperText={passerr ? "Password is Required" : ""} id="standard-basic" type="text" label="Your Password  " name="password" variant="standard" value={input.password} onChange={handleChange} type="number"  fullWidth/>
                        </div>
                        <div>
                            <Button disabled={disable} variant="contained" color="success" to="#" onClick={login}  className="btn btn-success mt-2">Login</Button>
                        </div>
                   </form>
                    <div className="mt-3">
                        <p>New to SMM solution?<Link className="text-primary h6" to="/signup"> Create Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
