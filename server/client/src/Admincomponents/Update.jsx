import Modals from '../Admincomponents/Modals'
// import {Modal,Button,Form} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'

function Update() {
    const[orders,setOrders]=useState([]);
    const[noorders,setnoOrders]=useState(false);
    const[modalShow,setmodalShow]=useState(false)
    const[id,setId]=useState()
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
    function editOrder(id)
    {
        setmodalShow(true)
        setId(id)
    }
    function handleClose()
    {
        setmodalShow(false)
    }
    function refresh()
    {
        fetchAllorders();
    }
    return (
        <div>
            <div className="top_ad d-flex flex-row justify-content-around">
                <h5 className="p-3">Update orders</h5>
                <p className="p-3 h6">Showing Result of {orders.length} Orders</p>
                <p><i class="fas p-3 fa-sync" onClick={refresh}></i></p>
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
                <th scope="col">ORDER ID</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">SERVICE</th>
                <th scope="col">QTY</th>
                <th scope="col">ORDRED AT</th>
                <th scope="col">STATUS</th>
                <th scope="col">ACTION</th>
                <th scope="col">LINK</th>
                <th scope="col">USER ID</th>
                </tr>
            </thead>
            <tbody>
               
                 {noorders ? <h4 className="my-2 text-danger">We could't find any user with</h4> : orders.map((info,index)=>(
                     <tr>
                    <td>{index+1}</td>
                    <td>{info._id}</td>
                    <td>{info.category}</td>
                    <td>{info.service}</td>
                    <td>{info.qty}</td>
                    <td>{info.orderedAt}</td>
                    <td>{info.status=="Ordered" ? <p className="ordered ">Ordered</p> : info.status=="Pending" ? <p className="pending ">Pending</p> : info.status=="inprogress" ? <p className="inprogress ">in progress</p>: info.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :info.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:info.status=="completed" ? <p className="completed">Completed</p> :""}</td>
                    <td><i class="far fa-edit" onClick={()=>editOrder(info._id)}></i></td>
                    <td>{info.link}</td>
                    <td>{info.user}</td>
                    </tr>
                ))
                
                } 
            
            </tbody>
                <Modals modalShow={modalShow} onHide={handleClose} id={id}/>
            </table>
                   
        </div>
    )
}

export default Update
