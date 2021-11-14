import React, { useEffect, useState } from 'react'
import '../myorder.css'
import Footer from './Footer'
import moment from 'moment'
import {TextField,Button,Tooltip,IconButton} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
function Myorders() {
    const[copied,setCopied]=useState(false);
    const[Linearproggrss,setLinearproggrss]=useState(false)
    const[display,setdisplay]=useState(false)
    const[orders,setOrders]=useState([])
    const[loading,setLoading]=useState(true)
    const[noResult,setNoresult]=useState(false)
    const[emptyOrder,setemptyorder]=useState(false)
    useEffect(() => {
      fetchOrder();
    }, [])

    const fetchOrder =async()=>{
        setLinearproggrss(false)
        let resp= await fetch('/fetchorder',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        setLoading(false)
        setLoading(false);
        setOrders(data)
        console.log(orders)
        if(data.length==0)
        {
            setemptyorder(true)
        }
    }
    function togglefilterbox()
    {
        document.getElementById('filterbox').classList.toggle('showfilterbox')
    }

    const filter1 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_ordered',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
        console.log(data)
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter2 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_pending',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
        console.log(data)
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter3 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_inprogress',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
        console.log(data)
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter4 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_cancelled',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
        console.log(data)
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter6 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_cancelledandrefunded',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
        console.log(data)
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter5 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/completed',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
        console.log(data)
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
   async function copy(id,indx)
    {
        if (navigator.clipboard != undefined)
        {
            await navigator.clipboard.writeText(id);
            setCopied(true);
            let btn=document.getElementById(`btn${indx}`);
            btn.innerHTML=`Copied <i class="far text-white ml-1 fa-check-circle"></i>`
            btn.style.backgroundColor="green"
            btn.style.color="white"
        }
        

    }
    return (
        <div>
            {Linearproggrss ? <LinearProgress/> :""}
            {loading ? <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"400px"}}><CircularProgress/><p className="my-2">Fetching your Orders...</p></div> :
            orders.length<=0 ? <div class="noorderdiv d-flex flex-column justify-content-center align-items-center" style={{height:"400px"}}>
                <i class="fas fa-3x text-secondary fa-frown"></i>
                <span className="py-3 h4">No orders found!</span>
                
            </div> :
                    <div>
                    <div className="container-fluid controlsmyorder">
                        <h3 className="my-2 myordhead"><i class="fas fa-people-carry"></i> my orders</h3>
                        <Tooltip placement="right" title="Filter"><IconButton><i class="fas my-2 fa-filter" onClick={togglefilterbox}></i></IconButton></Tooltip>
                        <div className="filterbox rounded shadow-lg" tabIndex="-1" id="filterbox">
                            <li className="filtertext" onClick={filter1}><i class="fas fa-list-ul"></i>  Ordered</li>
                            <li className="filtertext" onClick={filter2}><i class="far fa-clock"></i>  Pending</li>
                            <li className="filtertext" onClick={filter3}><i class="fas fa-hourglass-half"></i>  In progress</li>
                            <li className="filtertext" onClick={filter4}><i class="far fa-window-close"></i>  Cancelled</li>
                            <li className="filtertext" onClick={filter5}><i class="far fa-check-circle"></i>  Completed</li>
                            <li className="filtertext" onClick={filter6}><i class="fas fa-hand-holding-usd"></i>  Cancelled & Refunded</li>
                        </div>
                    </div>
                    
                    <table class="table table-bordered table-responsive">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">SL.NO</th>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">SERVICE</th>
                        <th scope="col">LINK</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">ORDER ID</th>
                        <th scope="col">CREATED AT</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                        orders.map((ord,ind)=>(
                        <tr>
                            <td>{ind+1}</td>
                            <td>{ord.category}</td>
                            <td>{ord.service}</td>
                            <td>{ord.link}</td>
                            <td>{ord.qty}</td>
                            {ord.status=="Ordered" ? <p className="ordered ">Ordered</p> : ord.status=="Pending" ? <p className="pending ">Pending</p> : ord.status=="inprogress" ? <p className="inprogress ">in progress</p>: ord.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :ord.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:ord.status=="completed" ? <p className="completed">Completed</p> :""}
                            <td><Button id={`btn${ind}`} className="copy" variant="contained" color="info" onClick={()=>copy(ord._id,ind)}><i class="far fa-clipboard mr-1"></i>Copy</Button>s{ord._id}</td>
                            <td>{moment(ord.orderedAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                        </tr>
                        ))} 
                    </tbody>  
                    
                    </table>  
                    </div>
            }      
        </div>
    )
}

export default Myorders
// {loading ? <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"200px"}}><CircularProgress/><p className="my-2">fetching your favourites...</p></div> :

// {emptyOrder ?  <div class="noorderdiv">
// <span className="py-3 display-6 text-danger">No orders Found!</span>
// </div> :


// {noResult ? <div>
//     <div className="noorderdiv"><span className="my-3 display-6 text-danger">No Results Found!</span></div>
// </div>: ""}


{/* <div>
<div className="container-fluid controlsmyorder">
    <h3 className="my-2 myordhead"><i class="fas fa-people-carry"></i> my orders</h3>
    <Tooltip placement="right" title="Filter"><IconButton><i class="fas my-2 fa-filter" onClick={togglefilterbox}></i></IconButton></Tooltip>
    <div className="filterbox rounded shadow-lg" tabIndex="-1" id="filterbox">
        <li className="filtertext" onClick={filter1}><i class="fas fa-list-ul"></i>  Ordered</li>
        <li className="filtertext" onClick={filter2}><i class="far fa-clock"></i>  Pending</li>
        <li className="filtertext" onClick={filter3}><i class="fas fa-hourglass-half"></i>  In progress</li>
        <li className="filtertext" onClick={filter4}><i class="far fa-window-close"></i>  Cancelled</li>
        <li className="filtertext" onClick={filter5}><i class="far fa-check-circle"></i>  Completed</li>
        <li className="filtertext" onClick={filter6}><i class="fas fa-hand-holding-usd"></i>  Cancelled & Refunded</li>
    </div>
</div>

<table class="table table-bordered table-responsive">
<thead class="thead-dark">
    <tr>
    <th scope="col">SL.NO</th>
    <th scope="col">CATEGORY</th>
    <th scope="col">SERVICE</th>
    <th scope="col">LINK</th>
    <th scope="col">QUANTITY</th>
    <th scope="col">STATUS</th>
    <th scope="col">ORDER ID</th>
    <th scope="col">CREATED AT</th>
    </tr>
</thead>

<tbody>
    {
    orders.map((ord,ind)=>(
    <tr>
        <td>{ind+1}</td>
        <td>{ord.category}</td>
        <td>{ord.service}</td>
        <td>{ord.link}</td>
        <td>{ord.qty}</td>
        {ord.status=="Ordered" ? <p className="ordered ">Ordered</p> : ord.status=="Pending" ? <p className="pending ">Pending</p> : ord.status=="inprogress" ? <p className="inprogress ">in progress</p>: ord.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :ord.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:ord.status=="completed" ? <p className="completed">Completed</p> :""}
        <td>{ord._id}</td>
        <td>{moment(ord.orderedAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
    </tr>
    ))} 
</tbody>  

</table>  
</div>  */}