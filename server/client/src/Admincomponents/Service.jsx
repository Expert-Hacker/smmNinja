import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Modal2 from '../Admincomponents/Modal2'
import Addservice from './Addservice';
function Service() {
    const[show1,setShow1]=useState(false)
    const[show,setShow]=useState(false)
    const[service,setservice]=useState([])
    const[serachterm,setsearchTerm]=useState("")
    const[curr,setcurr]=useState("")
    const[loading,setLoading]=useState(true)
    const[id,setId]=useState("")
    useEffect(() => {
        fetchCuerrencyDetails();
        fetchService();
    }, [])

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


    const fetchService =async () =>{
        try
        {
            setLoading(true)
        let responce=await fetch('/fetchServicepage',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let service=await responce.json();
        setLoading(false)
        setservice(service) 
        }
        catch(er)
        {
        }
    }
    function showhide(id)
    {
        setShow(true)
        setId(id)
    }
    function handleClose()
    {
        setShow(false)
    }
    function refresh()
    {
        fetchService();
    }
    const deleteService =async (id) =>{
        let res=window.confirm("Are you sure to delete?")
        if(res)
        {
            let resp=await fetch(`/deleteservice/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(resp.status==200)
            {
                alert("Deleted successfully.")
            }
        }
    }
    function addService()
    {
        setShow1(true)
    }
    function handleClose1()
    {
        setShow1(false)
    }
    const fetchServiceByDeatemodified =async () =>{
        try
        {
            setLoading(true)
        let responce=await fetch('/fetchServiceByDeatemodified',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let service=await responce.json();
        setLoading(false)
        setservice(service) 
        }
        catch(er)
        {
        }
    }
    return (
        <div>
            {loading ? <LinearProgress/>: ""}
            <div className="dummy">
                <div className="dummy_div2">

                </div>
            </div>
            <div class="d-flex">
                <p className="m-3">Showing result for {service.length} services</p>
                <TextField size="small" className="my-3 ml-3 w-25" onChange={(e)=>setsearchTerm(e.target.value)} id="outlined-basic" label="Search service" variant="outlined" />
                
                <select onChange={fetchServiceByDeatemodified} className="form-control w-25 mt-auto mb-auto mx-3" name="" id="">
                    <option selected className="text-center" value="">---Select---</option>
                    <option value="">Sort by date modifed</option>
                </select>
                <i class="fas fa-sync-alt ml-4 fa-2x mt-4" onClick={refresh}></i>
                <Button color="success" variant="contained" size="small" className="ad_service mt-auto mb-auto mx-3" onClick={addService}>ADD SERVICE</Button>
            </div>
            <table class="table">
        <thead class="thead-dark">
            <tr>
            <th scope="col">SL.NO</th>
            <th scope="col">ACTIONO</th>
            <th scope="col">NO.</th>
            <th scope="col">NAME</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">RATE</th>
            <th scope="col">MIN</th>
            <th scope="col">MAX</th>
            {/* <th scope="col">DESCRIPTION</th> */}
            <th scope="col">DRIPFEED</th>
            
            </tr>
        </thead>
        <tbody>
        
            {service.filter((val)=>{
                if(serachterm=="")
                {
                  return val
                }
                else if(val.category.toLowerCase().includes(serachterm.toLocaleLowerCase()))
                {
                  return val
                }
               
              }).map((serv,ind)=>(
                <tr>
                    <th scope="row">{ind+1}</th>
                    <td><i class="far fa-edit" onClick={()=>showhide(serv.service)}></i> <i class="fas ml-4 fa-trash-alt" onClick={()=>deleteService(serv.service)}></i></td>
                    <td>{serv.service}</td>
                    <td>{serv.name}</td>
                    <td>{serv.category}</td>
                    <td>{serv.rate*curr}</td>
                    <td>{serv.min}</td>
                    <td>{serv.max}</td>
                    {/* <td>{serv.desc}</td> */}
                    <td>{serv.dripfeed}</td>
                </tr>
            ))}
            
        </tbody>
        <Modal2 show={show} onHide={handleClose} id={id}/>
        <Addservice show1={show1} handleClose1={handleClose1}/>
        </table>


        </div>
    )
}

export default Service
