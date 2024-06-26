import React, { useContext, useRef } from 'react'
import {FaBell} from 'react-icons/fa'
import styles from '../styles/jednoobavjestenje.css'
import { useState } from 'react'
import AuthContext from '../context/AuthContext'
import {useNavigate } from 'react-router-dom'

const Obavjestenje = ({naslov,opis,id,datumKreiranja}) => {
  const [visible,setVisible] = useState(false);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  



  return (
    <div className = "jednoObavjestenje" key = {id}  onClick = {(e) => {setVisible(!visible)}}>
       
       <div id = "vrijemeNaslov">
          <span id = "vrijemeObavjestenja">{new Date(datumKreiranja).toLocaleString()}</span>
          <h2 className = "naslovObavjestenje">
            {naslov}
          </h2>
       </div>

       <div className={`tekstObavjestenja ${visible === true ? 'visible' : ''}`}>
        <p>{opis}</p>
        {user.rola === 'Student' && <button id = "oznaciProcitano">Označite kao pročitano</button>}
        {user.rola === 'Profesor' && 
        <div id = "dugmadDiv">
          <button id = "oznaciProcitano" onClick = {(e) => {e.stopPropagation(); navigate(`/editNotification/${id}`)}}>Izmijeni</button> <button id = "oznaciProcitano">Izbrisi</button> 
        </div>
        }


       </div>


    </div>
  )
}

export default Obavjestenje