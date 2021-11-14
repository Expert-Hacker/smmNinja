import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import {Button,Checkbox, Link} from '@mui/material';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import 'react-toastify/dist/ReactToastify.css';

import '../neworder.css'
import { useHistory } from 'react-router';
function Neworder() {
    const[currency,setcurr]=useState("")
    let history=useHistory();
    let fullRate;
    const[category,setCategory]=useState([])
    const[service,setService]=useState([])
    const[prevService,setprevService]=useState("")
    const[previewInfo,setpreviewInfo]=useState([])
    const[error,setError]=useState(false)

    
    const[linkError,setlinkError]=useState(false)
    const[min,setMin]=useState("")
    const[max,setMax]=useState("")
    const[desc,setDec]=useState("Loading..")
    const[rate,setRate]=useState(0)
    const[name,setName]=useState("Loading..")

    const[totalCharge,setTotalcharge]=useState(0)

    const[inputerror,setinputerror]=useState(false);
    const[fundError,setFunderror]=useState(false);
    
    const[postCategory,setpostCategory]=useState("")
    const[postservice,setpostservice]=useState("")
    const[postLink,setpostLink]=useState("")
    const[postQty,setpostQty]=useState("")

    const[submitLoading,setsubmitLoad]=useState(false)
    const[btndisable,setbtndisable]=useState(false)

    const[balance,setBalance]=useState(0)
    const[link,setLink]=useState({
        text:""
    })
    const[tggleTCharge,settggleTCharge]=useState()

    const[zeroamt,setZerpamt]=useState(false)

    const[calcBtn,setCalcBtn]=useState(true)

    const[qty,setQty]=useState() //for qty input control
    let qtyName,qtyValue;

    function calculateTotal()
   {
        // let charge=(qty*Math.ceil(74.15*rate));
        // charge=(charge/100);
        // setTotalcharge((charge))
        
    if(min==1)
    {
            let charg=((rate*currency));
            setTotalcharge(charg)
    }
    else
    {
        let charge=(qty*(currency*rate)/1000);
        // charge=(charge/100);
        setTotalcharge((charge))
    }
        
   }

    async function fetchCuerrencyDetails()
    {
        let resp=await fetch('/fetchcurrency',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }  
        })
        let data=await resp.json();
        setcurr(data.currency)
    }
   


    function handleQtychange(e)
    {
        e.preventDefault();
       
        setQty(e.target.value)
     setTotalcharge(0)
        if(qty>0)
        {
            setCalcBtn(false)
        }
        if(e.target.value=="")
        {
            setCalcBtn(true)
            // return setTotalcharge(0)
        }
        

        // let charge=(qty*rate);
        // charge=(charge/1000);
        // setTotalcharge((charge*74.15))
    }
   

    const createOrder =async(e)=>{
        e.preventDefault();
   
        console.log(postCategory)
        console.log("rate", rate)
        console.log(link.text)
        console.log(qty)
        // setTotalcharge();
        console.log("total charge", totalCharge)
        

        if(balance<totalCharge)
        {
            setZerpamt(false)
            return setFunderror(true)
        }
        
        if(postCategory =="" || postservice=="" || link.text=="" )
        {
            return setinputerror(true)
        }
      
            if(totalCharge==0)
            {
                return setZerpamt(true)
            }
       
        setbtndisable(true);
        setsubmitLoad(true)
        setinputerror(false)
        setZerpamt(false);
        setFunderror(false)
        let resp=await fetch('/createorder',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                category:postCategory,
                service:postservice,
                link:link.text,
                qty,
                price:((rate*currency)),
                total:totalCharge
            })
        })
        let data=await resp.json();
        if(resp.status==201)
        {
            setbtndisable(false);
            setsubmitLoad(false)
            toast.success(`Ordred Successfully! - ID:${data._id} `, {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
        else
        {
            setbtndisable(false);
            setsubmitLoad(false)
            alert("order not successfull")
        }


    }
//setting services when selecte changed
    const handleSelectChange = (e) =>{
        setpostCategory(e.target.value)
        const fetchserviceName=async()=>{
            try{
                let resp=await fetch(`/fetchserviceName/${e.target.value}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                setError(false)
                let data=await resp.json();
                setinputerror(false)
                setService(data)
                // let charge=(qty*Math.ceil(74.15*rate));
                // charge=(charge/100);
                // setTotalcharge((charge))
              
    
            }
            catch(errr)
            {
                setError(true)
            }
            }
        fetchserviceName();
    }
    useEffect(() => {
        fetchCuerrencyDetails();
       fetchService();
       authUser();
    }, [totalCharge])

//fetching category
    const fetchService =async ()=>{
        try{
            let resp= await fetch('/fetchService',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setError(false)
            let data= await resp.json();
            setCategory(data)
            setinputerror(false)
        }
        catch(er)
            {
               setError(true)
            }
       
    }

  async  function authUser()
    {
       
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
    let name1,value
    const handleLinkchanage =(e)=>{
        name1=e.target.name;
        value=e.target.value;
        setLink({...link,[name1]:value})
    }

//fetching services org
    const handleservice =(e)=>{
        console.log("service changed")
        setprevService(e.target.value)
        setpostservice(e.target.value)
        fetchname();
        setQty(0)
        setTotalcharge(0)
        async function fetchname()
        {
            try{
                let resp= await fetch(`/fetchName/${e.target.value}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                let data= await resp.json();
                
                setinputerror(false)
                // console.log(data)
                setCalcBtn(false)
                setError(false)
                setRate(data[0].rate)
                setpreviewInfo(data)
                setMin(data[0].min)
                setMax(data[0].max)
                setDec(data[0].desc)
                
                setName(data[0].name)
                 fullRate=rate*currency
                 console.log("setting t charge")
               
                     settggleTCharge((fullRate))
                     
                    //  console.log("setting t charge after", totalCharge)
               

            
            }
            catch(er)
            {
               setError(true)
            }
            
        }
        
    }
    function addfund()
    {
        history.push("/v1/addfund")
    }
    return (
        <div className="overflow overflow1">
            
            {error ? <div class="alert alert-danger mt-3 mb-0" role="alert">
                    <h6 className="font-weight-bold text-danger p-0 m-0"><i class="fas fa-exclamation-triangle"></i> This service may temporarily unavailable. Please contact Admin or select anothet service</h6>
            </div> : ""}
            <div className="neworder  row">
                <div className="left_neworder col-sm">
                        <div className="my-3">
                            <h4 className="neword p-2"><i class="fas fa-shopping-cart"></i>  New order</h4>
                        </div>
                        <div className="my-3">
                            <h6>select Category <span className="text-danger">*</span></h6>
                            <select className="form-control" onSelect={(e)=>{setpostCategory(e.target.value)
                            }} onChange={handleSelectChange}>
                            <option className="bg-dark text-white" value="a" >Select Category </option>
                                {
                                    category.map((cate,index)=>(
                                        <option className="bg-dark text-white" value={cate} key={index}>{cate}</option>
                                    ))
                                }
                               
                            </select>
                        </div>
                        <div className="my-3">
                            
          
                            <h6>select Service <span className="text-danger">*</span></h6>
                            <select className="form-control" name="" id="" onChange={handleservice}>
                            <option value="">Select Service</option>
                                {
                                    service.map((serv,ind)=>(
                                        <option className="bg-dark text-white" value={serv.name} key={ind}>{serv.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="my-3 linksss">
                            <h6>Enter Link <span className="text-danger">*</span></h6>
                            <input className="form-control" value={link.text} name="text" placeholder="https://" onChange={handleLinkchanage} type="text" />
                        </div>
                        {min<=1 ? "":<div className="my-3">
                            <h6>Quantity {min=="" ? "" :<> <span className="text-success font-weight-bold h6">(Min: {min}</span><span className="text-danger font-weight-bold h6">, Max: {max}) <span className="text-danger">*</span></span></>}</h6>
                            <div className="d-flex justity-content">
                                <input value={qty} onChange={handleQtychange} name="qty" className="w-75 form-control" type="number" />
                                <Button  variant="contained" color="inherit" disabled={calcBtn} onClick={calculateTotal}>Calculate</Button>
                            </div>
                            
                        </div>}
                        <div className="my-3">
                            <h6><i class="fas fa-rupee-sign"></i> Total charge</h6>
                            {/* <input disabled className="form-control-outline-primary" type="number" value={ totalCharge}/> */}
                            {min<=1 ? <><h3 className="display-6"><span class="badge badge-dark">{ ((rate*currency))}</span></h3><Button  variant="contained" color="inherit" disabled={calcBtn} onClick={calculateTotal}>Calculate</Button></> : <h3 className="display-6"><span class="badge badge-dark">{ totalCharge}</span></h3>}
                        </div>
                        <div>
                            <div className="d-flex ">
                                <Checkbox defaultChecked checked/>
                                <p className="my-auto ml-2">I have agreed for terms and conditions.</p>
                            </div>
                            
                            <div className="error">
                                <button className="btn btn-success my-2 mr-3" disabled={btndisable} type="button" onClick={createOrder}>SUBMIT</button>{submitLoading ? <CircularProgress  className="position-absolute mt-2"  color="info"/> : ""}
                                {inputerror ? <span className="errosubmit"><i class="fas fa-exclamation-circle"></i>  please provide the input(s)</span> : ""}
                                {zeroamt ? <span className="errosubmit"><i class="fas fa-exclamation-circle"></i>  Please click on Calculate then SUBMIT</span> : ""}
                                {fundError ? <button onClick={addfund} className="errosubmit"><i class="fas fa-exclamation-circle"></i>  Insufficient fund.<span className="errosubmit_addfnd" to="/v1/addfund">Add fund</span> </button> : ""}
                            </div>
                        </div>
                </div>
                <div className="right_neworder my-3 col-sm overflow" >
                    <div className="my-0">
                        <h4 className="neword p-2">Order Preview</h4>
                    </div>
                    <div className="my-3">
                        <h6>Service</h6>
                        <input value={name} className="form-control" disabled type="text" name="" id="" />
                    </div>
                    <div className="d-flex my-3">
                        <div>
                            <h6>Minimumn Quantity</h6>
                            <input value={min} className="form-control col-11" disabled type="text" name="" id="" />
                        </div>
                        <div>
                            <h6>Miximumn Quantity</h6>
                            <input className="form-control col-11" value={max} disabled type="text" name="" id="" />
                        </div>
                        <div>
                            <h6 className="p-0 m-0">Rate </h6>
                            <h6 className="p-0">per 1000 (<i class="fas fa-rupee-sign"></i> INR)</h6>
                            <input className="form-control col-11 my-auto" value={((rate*currency))} id="rateperthousend" disabled type="text" name="" id="rateperthousend" />
                        </div>
                    </div>
                    <div>
                        <textarea value={desc} cols="70" className="form-control" disabled rows="10"></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Neworder
