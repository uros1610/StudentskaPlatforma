import React from 'react'
import styles from '../styles/login.css'
import {FaUser,FaLock} from 'react-icons/fa'
import { useState } from 'react'

const Login = () => {

    const [data,setData] = useState({
       korisnickoIme:"",
       lozinka:"" 
    })

    const handleChange = (e) => {
        const newObj = {...data};
        const id = e.target.id;
        console.log(id);
        newObj[id] = e.target.value;
        setData(newObj);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(data);
    }   



  return (
    <div className = "loginDiv">

        <div className = "wrapZaSliku">
            <img src = "https://www.ucg.ac.me/skladiste/blog_10/objava_180884//Univerzitet%20Crne%20Gore.jpg" className = "slikaFakultet"/>
        </div>

        <form className = "loginForm">

            <p className = "imeSajta">ezINDEX</p>

            <div className = "inputUserNameDiv">
                <FaUser className = "userIcon"/>
                <input type = "text" placeholder = "Korisničko ime" id = "korisnickoIme" onChange={handleChange}/>
            </div>

            <div className = "inputPasswordDiv">
                <FaLock className = "lockIcon"/>
                <input type = "password" placeholder = "Lozinka" id = "lozinka"  onChange={handleChange}/>
            </div>

            <button className = "loginButton" onClick = {handleLogin}>LOGIN</button>


        </form>

    </div>
  )
}

export default Login