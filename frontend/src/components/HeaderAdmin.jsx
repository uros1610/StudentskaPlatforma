import React, { useContext } from "react";
import logo from "../images/logo_si.png";
import { Link } from "react-router-dom";
import "../styles/HeaderAdmin.css";
import AuthContext from "../context/AuthContext";

const HeaderAdmin = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div id="header-container">
            <header id="header">
                <nav className="header-nav header-padding-nav">
                    <Link to="/admin"><img src={logo} alt="Logo" id="header-logo-img" /></Link>
                    <ul>
                        <li><Link to="/admin-profile">{user ? user.korisnickoIme : 'Profil'}</Link></li>
                        <li><span onClick={logout}>Odjavi se</span></li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default HeaderAdmin;
