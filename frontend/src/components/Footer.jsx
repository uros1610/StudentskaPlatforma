import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import "../styles/footer.css"

const Footer = () => {
    return (
        <div id="footer-container">
            <footer id="footer">
                <p id="footer-mess">&copy; 2024 Univerzitet Crne Gore | Sva prava zadržana | ezIndex</p>
                <div>
                    <div id="footer-email-div">
                        <FontAwesomeIcon icon={faEnvelope} className="footer-icons" />
                        <p className="footer-p">rektorat@ucg.ac.me</p>
                    </div>
                    <div id="footer-phone-div">
                        <FontAwesomeIcon icon={faPhone} className="footer-icons" />
                        <p className="footer-p">+382-20-414-255</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer