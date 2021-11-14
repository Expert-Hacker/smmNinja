import React from 'react'
import '../footer.css'
import logo from '../images/logo1.png'
import {Link} from 'react-router-dom'
function Footer() {
    return (
        <div>
            <div className="footer d-flex flex-column  p-4">
                <div className="leftFooter d-flex flex-row justify-content-around">
                    <div className="logoFooter d-flex flex-row mr-4">
                        <img className="bg-light" src={logo} alt="logo" height="90px" width="90px" />
                        <select className="ml-4 my-auto">
                            <option value="english">English</option>
                        </select>
                    </div>
                    <div className="quickLinks d-flex flex-row">
                        <div className="text-white d-flex flex-column">
                            <h5 className="contactinfo"><u>Contact Information</u></h5>
                            <span>Email: support@smmsolutions.com</span>
                            <span className="">Whatsapp: +91 6361027573</span>
                            <span>Working Hour: Mon-Sat 9AM-11PM</span>
                        </div>
                    </div>
                </div>
                <div className="rightFooter container d-flex mr-auto">
                    <div className="leftQuicklinks text-white  d-flex mr-4 flex-column">
                        <Link to="/v1/dashboard">Home</Link>
                        <Link to="/v1/addfund">Add fund</Link>
                        <Link to="/v1/privacy-policy">Privacy-Policy</Link>
                    </div>
                    <div className="rightQuickas text-white h6 d-flex flex-column">
                        <Link to="/v1/terms-and-conditions">Terms & conditions</Link>
                        <Link to="/v1/disclaimer">Disclaimer</Link>
                    </div>
                </div>
                <hr />
                <div className="d-flex footer_copy flex-column justify-content-center">
                    <h6 className="text-white text-center  pt-1">Copyright © 2021 - SMM Solutions - </h6>
                    <span className="text-white text-center pb-1">Made with ❤️ - Hand crafted by Keerthan</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
