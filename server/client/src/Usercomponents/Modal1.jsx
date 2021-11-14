import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
function Modal1(props) {
  const[currency,setcurr]=useState("")
  useEffect(() => {
    fetchCuerrencyDetails();
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
 
    return (
        <div>
            <div class="modal  fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">{props.name}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                         <p className="font-weight-bold">Minumum:<span className="text-success mx-2">{props.min}</span></p>
                         <p className="font-weight-bold">Maximum:<span className="text-danger mx-2">{props.max}</span></p>
                         <p className="font-weight-bold">Rate per 1000(INR):<span className=" mx-2">{props.rate*currency}</span></p>
                            <hr />
                         <p className="font-weight-bold">Description:</p><span>{props.desc}</span>
                        </div>
                        <div class="modal-footer">
                          <Button   data-dismiss="modal">Close</Button>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
    )
}

export default Modal1
