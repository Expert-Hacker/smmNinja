import React, { useEffect, useState } from 'react'
import {Modal,Form} from 'react-bootstrap'
import {TextField,Button,LinearProgress} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserEditModal(props) {
    const[loading,setLoading]=useState(true)
    const[info,setInfo]=useState([]);
    const[selected1,setselected1]=useState(false)
    const[selected2,setselected2]=useState()
    const[role,setRole]=useState(props.role)
    const[balance,setBalance]=useState({
        "balance":""
    })

    let namee,value
  
    function handleBalance(e)
    {
            namee=e.target.name;
            value=e.target.value;
            setInfo({...balance,[namee]:value})
    }
    useEffect(() => {
     fetchDeatils();
    }, [])

   async function fetchDeatils()
    {
        
        setselected1(false)
        setselected2(false)
        let resp=await fetch(`/searchsingleuserByID/${props.id}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        console.log("data")
        console.log(data)
        setInfo(data[0])
        setRole(props.role)
      
         switch(data[0].role) 
         {
          case "admin":
            setselected2(true)
            setLoading(false)
              break;
              case "user":
                setselected1(true)
                setLoading(false)
                  break;
          default:
              break;
        }
      setLoading(false)
       
    }
    
    function refresh()
    {
        setLoading(true)
        fetchDeatils();
    }
    async function UpdateUser(e)
    {
       try {
        e.preventDefault();
        let up_balance=info.balance;

        let resp= await fetch(`/update-user/${props.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                role,up_balance
            })
        })
        if(resp.status==200)
        {
            toast.success('Update Successfull!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
       } catch (error) {
        toast.error('Unable to update', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            });  
       }
    }
    const ChangeRole = (e) =>{
        setRole(e.target.value)
    }
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                
                <ToastContainer/>
                {loading ? <LinearProgress color="error"/> : ""}
            <Modal.Header >
                <Modal.Title>
                   <div className="d-flex">
                    <p>Edit user: {props.id}</p>
                    <p><i className="fas fa-sync-alt" onClick={refresh}></i></p>
                   </div>
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="mb-2">{info._id}</span>
                <form action="">
                    <span >Select Role</span>
                    <select className="form-control mb-4" onChange={ChangeRole}  name="" id="">
                        <option selected={selected1} className="p-2" value="user">User</option>
                        <option selected={selected2} className="p-2" value="admin">Admin</option>
                    </select>
                    <TextField className="my-2" onChange={handleBalance} type="number" name="balance"  helperText="Balance" value={info.balance}  fullWidth variant="outlined"></TextField>
                    <Button className="mr-3 mt-2" variant="contained"  color="secondary" onClick={UpdateUser}>SAVE</Button>
                    <Button className="mr-3 mt-2" variant="contained" onClick={props.handleClose}>
                    Close
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                
             
            </Modal.Footer>
        </Modal>
        </div>
    )
}

export default UserEditModal
