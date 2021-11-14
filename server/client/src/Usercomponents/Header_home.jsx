import React from 'react'
import '../header_home.css'
import {Link,useHistory} from 'react-router-dom'
import logo from '../images/logo1.png'
import {TextField,Button} from '@mui/material'
function Header_home(props) {
    const history=useHistory();
    function login()
    {
        history.push("/login")
    }
    function signup()
    {
        history.push("/signup")
    }
    return (
        <div className={`position-${props.position} w-100`}>
            <div className="header ">
                <ul className="d-flex justify-content-between container-fluid">
                    <div>
                        <li><Link to="/"><img className="logo" src={logo} alt="logo" height="50px" width="50px" className="bg-light"/></Link></li>
                    </div>
                    <div className="d-flex links my-auto">
                        <li><Button onClick={login} color="warning" variant="contained" to="/login">Login</Button></li>
                        <li><Button onClick={signup} className="text-white" color="inherit" variant="outlined" to="/signup">SignUp</Button></li>
                        {/* <li><a href="">What we offer!</a></li> */}
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Header_home
