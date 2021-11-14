import React, { useState } from 'react'
import { Link ,useHistory} from 'react-router-dom'
import Header_home from './Header_home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../signup.css'
import {TextField,Button, Tooltip, Checkbox } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import  { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

var validator = require("email-validator");



function Signup() {
    const[show,setShow]=useState(false)
    const[disable,setDisable]=useState(false)
    const[loading,setLoading]=useState(false);
 const[nameerr,setnameerr]=useState(false)
const[emailerr,setemailerr]=useState(false)
const[numerr,setnumerr]=useState(false)
const[passerr,setpasserr]=useState(false)
const[cpasserr,setcpasserr]=useState(false)
  const[passMatch,setpassMatch]=useState(false)
  const[sighnupvalid,setsignupValid]=useState(false)
  const[invaliEmailerror,setinvaliEmailerror]=useState(false)
  const[MinmaxPass,setminmaxpass]=useState(false)

  const[invalidName,setinvalidName]=useState(false)

  let history=useHistory();
    const [input,setInput]=useState({
        name:"",
        email:"",
        number:"",
        password:"",
        cpassword:""
    })
    let name,value;
    const handleChange = (e) =>{
      
        name=e.target.name;
        value=e.target.value;
        setInput({...input,[name]:value})
    }

    const register1 =async(e)=>
    {
        e.preventDefault();
        setDisable(true)
        const {name,email,password,cpassword}=input;
        let phone=input.number;
        console.log(validator.validate(email))

        if(password!==cpassword)
        {
            setpassMatch(true)
            setDisable(false)
        }
        if(validator.validate(email))
        {
              
        }
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail)
        {
            setemailerr(true)
        }
       
             if(!name || !email || !password || !cpassword || !phone)
                {
                   
                    if(!name)
                    {
                        setnameerr(true)
                        setDisable(false)
                    }
                    if(name.trim().length==0)
                    {
                        setnameerr(true)
                        setDisable(false)
                    }
                 
                    if(email.length==0)
                    {
                        setemailerr(true)
                        setDisable(false)
                    }
                   
                    if(!phone)
                    {
                        setnumerr(true)
                        setDisable(false)
                    }
                    if(phone.length<10 || phone.length>10)
                    {
                        setnumerr(true)
                        setDisable(false)
                    }
                    if(!password || !cpassword)
                    {
                        setpasserr(true)
                        setDisable(false)
                    }
                    if(!cpassword)
                    {
                        setcpasserr(true)
                        setDisable(false)
                    }
                    
                }
              
               else 
            {
        
       
        if(validator.validate(email))
        {
            setLoading(true)
            let trimmed_name=name.trim();
            let res=await fetch('/register',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 name:trimmed_name,email,phone,password,cpassword
             })  
         })
         let resp=await res.json();
    console.log(resp);
         if(res.status==201)
         {
             setLoading(false)
            toast.success('Registration Successfull!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                // setsignupValid(true)
                setTimeout(function()
                {
                    history.push("/login")
                },3500)
                
          
         }
         else if(res.status==400)
         {
            setLoading(false)
            toast.error(`${resp.resp}`, {
                position: "bottom-center",
                autoClose: 3700,
                draggable: false,
                
                }); 
                setsignupValid(false)
                setDisable(false)
               
         }
        }
        else
        {
            setLoading(false)
            setinvaliEmailerror(true)
            setDisable(false)
        }
        
    }
    }
 
    function passwordHelp()
    {
        document.getElementById('passHelp').classList.toggle('TogglepasswodHelpDiv')

    }
    function whatsappNum()
    {
        document.getElementById('whatsappNum').classList.toggle('TogglewhatsappNum')
    }
 
    return (
        <div>
            <Header_home/>
            <ToastContainer/>
          
            <div className="m-auto container">
            {loading ? <LinearProgress/> : ""}
                <div className="title">
                    <h3>Create an account</h3>
                </div>
                
                <div className="controls">
                    <form method="POST">
                        <div className="my-3 d-flex flex-row ">
                            <i className="fas icons fa-user-circle  mr-2"></i>
                           
                            <TextField disabled={disable}  helperText={nameerr ? "Name is Required" : ""}  id="standard-basic" type="text" label="Your Name" name="name" variant="standard" value={input.name} onChange={handleChange} fullWidth/>
                        </div>
                        <div className="my-3 d-flex flex-row">
                            <i className="fa icons fa-envelope mr-2"></i>
                            <TextField disabled={disable} helperText={emailerr ? "Email is Required" : emailerr==false&&invaliEmailerror ? <span className="text-danger">Invalid Email</span> : ""} error={emailerr} id="standard-basic" type="email" label="Email" name="email" variant="standard" value={input.email} onChange={handleChange} fullWidth/>
                        </div>
                        <div className="my-3 d-flex flex-row">
                            <i className="fab icons fa-whatsapp-square mr-2"></i>
                            <TextField disabled={disable} helperText={numerr ? "Number is Required" : ""} error={numerr} id="standard-basic" type="number" label="Whatsapp" name="number" variant="standard" value={input.number} onChange={handleChange} fullWidth/>
                            <div id="whatsappNum" className="bg-dark text-white whatsappNum img-fluid">
                                <p>We wil notify you for any Discount sale or Bigsale 🎉</p>
                                
                            </div>
                            <i class="far fa-question-circle passwodHelp" onClick={whatsappNum}></i>
                        </div>
                        <div className="my-3 d-flex flex-row">
                        <i className="fas icons mr-2 fa-key"></i>
                            <TextField disabled={disable}  helperText={passerr ? "Password is Required" : passMatch ? <span className="text-danger">Password should be match</span> : ""} error={passerr} id="standard-basic" type="text" label="Password" name="password" variant="standard" value={input.password} onChange={handleChange} fullWidth/>
                            <div id="passHelp" className="bg-dark text-white passwodHelpDiv img-fluid">
                                <p>password must be 8 characters long</p>
                                <p>At least one character must be alpabetical AND at least one character must be digit OR special character.!^$@</p>
                                <p>Password cannot contain any string that is also container in username</p>
                            </div>
                            <i class="far fa-question-circle passwodHelp" onClick={passwordHelp}></i>
                            
                        </div>
                        <div className="my-3 d-flex flex-row">
                            <i className="fas icons mr-2 fa-key"></i>
                            <TextField disabled={disable} helperText={cpasserr ? "Password is Required" : passMatch ? <span className="text-danger">Password should be match</span> : ""} error={cpasserr} id="standard-basic" type="text" label="Confirm Password" name="cpassword" variant="standard" value={input.cpassword} onChange={handleChange} fullWidth/>
                        </div>
                        
                            {passMatch ? <span className="p-0 m-0 text-danger">Both Passwords should be match</span> : ""}
                        
                        <div>
                            <div className="d-flex">
                                <Checkbox checked/>
                                <p className="mt-auto mb-auto">I agree the <Link to="/v1/terms-and-conditions" className="termsncond text-dark">Terms</Link> & <Link to="/v1/privacy-policy" className="termsncond text-dark">Policy</Link></p>
                            </div>
                            <Button disabled={disable}  variant="contained"  onClick={register1} className="mt-2">Register</Button>
                        </div>
                    </form> 
                    <div className="mt-3">
                        <p>Already have an account?<Link className="text-primary h6" to="/login"> Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
