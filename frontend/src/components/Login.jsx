import React, { useContext } from 'react'
import '../styles/login.css'
import {FaUser,FaLock} from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'
import slikaFakultet from '../img/login_img.jpg'
import logo from '../img/logo_si.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Login = () => {

    const [data,setData] = useState({
       korisnickoIme:"",
       lozinka:"" 
    })

    const {login} = useContext(AuthContext)

    const handleChange = (e) => {
        const newObj = {...data};
        const id = e.target.id;
        console.log(id);
        newObj[id] = e.target.value;
        setData(newObj);
    }

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await login(data);
        navigate('/home');
        }
        catch(err) {
        }
    }   



  return (
    <main id="login-body">
            <div id="content-login">
                <div id="login-div">
                    <div id="login-ttl">
                        <div id="logo-title-login">
                            <img alt="Logo" src={logo} id="login-logo-img" />
                            <h1 id="h1-login">ezIndex</h1>
                        </div>
                        {/* <p id="login-p-mess">Nemaš nalog? <Link to="/register">Registruj se sada!</Link></p> */}
                    </div>
                    <form id="form-login">
                        <div className = "inputUserNameDiv">
                            <FaUser className = "userIcon"/>
                            <input type="text" name="username" id="username" className="login-inp" required placeholder='Korisničko ime' onChange={handleChange} />
                        </div>

                        <div className = "inputPasswordDiv">
                            <FaLock className = "lockIcon"/>
                            <input type="password" name="password" id="password" className="login-inp" required placeholder='Lozinka' onChange={handleChange} />
                        </div>

                        <button className = "loginButton" onClick = {handleLogin}>Login</button>
                    </form>
                </div>
                <div id="image-login">
                    <img alt="Početna slika" src={slikaFakultet} id="login-img" />
                </div>
            </div>
        </main>
  )
}

export default Login