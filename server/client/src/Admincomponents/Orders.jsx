import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
import moment from 'moment';
function Orders() {
    const[deleting,setDeleting]=useState(false)
    const[orders,setOrders]=useState([]);
    useEffect(() => {
        fetchAllorders();
    }, [])
    async function fetchAllorders()
    {
        let resp= await fetch('/fetchAllorders',{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setOrders(data)
        console.log(data);
    }
    async function selectStatus(e)
    {
        console.log(e.target.value)
        let resp= await fetch(`/fetchAllorders/${e.target.value}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setOrders(data)
        console.log(orders);
    }
  async  function deleteOrder(id)
    {
        setDeleting(true)
        let resp=await fetch(`/deleteOrder/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        if(resp.status==200)
        {
            fetchAllorders();
            setDeleting(false)
        }
    }


    return (
        <div>
            <div className="top_ad d-flex flex-row justify-content-around">
                <div className="deleteStatus">
                   {deleting ?  <span class="deleting">Deleting...</span> : ""}
                </div>
                <h5 className="p-3">Orders</h5>
                <p className="p-3 h6">Showing Result of {orders.length} Orders</p>
               
                {/* <TextField   id="standard-basic" type="text" label="Search Here" name="search" variant="standard"  /> */}
                <div className="p-3">
                <select className="form-control w-75" onChange={selectStatus} name="" id="">
                  
                    <option value="Ordered">Ordered</option>
                    <option value="Pending">Pending</option>
                    <option value="inprogress">Inprogress</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelledandferunded">Cancelled & Refunded</option>
                </select>
                </div>
            </div>
           <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">ACTION</th>
                <th scope="col">USER ID</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">SERVICE</th>
                <th scope="col">QTY</th>
                <th scope="col">STATUS</th>
                <th scope="col">TOTAL</th>
                <th scope="col">LINK</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">CREATED AT</th>
                </tr>
            </thead>
            <tbody>
               
                {orders.map((info,index)=>(
                     <tr>
                    <td>{index+1}</td>
                    <td><i class="fas fa-trash-alt" onClick={()=>deleteOrder(info._id)}></i></td>
                    <td>{info.user}</td>
                    <td>{info.category}</td>
                    <td>{info.service}</td>
                    <td>{info.qty}</td>
                    <td>{info.status}</td>
                    <td>{info.total}</td>
                    <td>{info.link}</td>
                    <td>{info._id}</td>
                    <td>{moment(info.orderdAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                    </tr>
                ))}
                
            </tbody>
            </table>
        </div>
    )
}

export default Orders
