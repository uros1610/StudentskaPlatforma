import React from "react"
import logo from "../images/logo_si.png"
import { Link } from "react-router-dom"
import "../styles/header.css"

const Header = () => {
    return (
        <div id="hreader-container">
            <header id="header">
                <nav className="header-nav header-padding-nav">
                    <Link to="/"><img src={logo} alt="Logo" id="header-logo-img" /></Link>
                    <ul>
                        <li><Link to="/profile">Nalog</Link></li>
                        <li><Link to="/login">Odjavi se</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header