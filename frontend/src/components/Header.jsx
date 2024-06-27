import React, { useContext } from "react"
import logo from "../images/logo_si.png"
import { Link } from "react-router-dom"
import "../styles/header.css"
import AuthContext from "../context/AuthContext"

const Header = () => {
    const {user} = useContext(AuthContext)
    return (
        <div id="hreader-container">
            <header id="header">
                <nav className="header-nav header-padding-nav">
                    <Link to="/"><img src={logo} alt="Logo" id="header-logo-img" /></Link>
                    <ul>
                        <li><Link to="/profile">{user ? user.korisnickoIme  : 'Profil'}</Link></li>
                        <li><Link to="/login">Odjavi se</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header