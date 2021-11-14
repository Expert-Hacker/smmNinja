import React from 'react'
import { TextField,Button } from '@mui/material'
import {Modal} from 'react-bootstrap'
function Notifications(props) {
    return (
        <div className="notification">
            <Modal show={props.show} className="notification" onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><i class="far fa-bell"></i> Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>currently you don't have any notifications</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="warning" onClick={props.handleClose}>
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Notifications
