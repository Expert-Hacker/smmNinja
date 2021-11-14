import React from 'react'
import Header_home from './Header_home'
import '../home.css'
import img from '../images/homePagepic.png'
import img2 from '../images/intro.png'
import { Link,useHistory } from 'react-router-dom'
import {TextField,Button} from '@mui/material'
function Home() {
    let history=useHistory();
    function navigate()
    {
        history.push('/v1/dashboard')
    }
    return (
        <div>
            <Header_home position="fixed"/>
            <div class="container-fluid">
               <div className="home_body1 d-flex">
                    <div className="d-flex flex-column m-auto">
                        <span className="display-2 mt-5 head_home">India's Cheapest SMM Service</span>
                        <span className="text-dark caption">Get your social accounts Likes, Followers, Subscribers & More in cheap price at One Place</span>
                        <Button onClick={navigate} className="w-25 btnn font-weight-bold mr-auto" variant="contained" color="warning">GET STARTED <i class="fas ml-1 fa-arrow-right"></i></Button>
                    </div>
                    <img src={img2} alt="image" height="700px" width="700px" className="mt-5 img-fluid"/>
               </div>
            </div>
        </div>
    )
}

export default Home
