import React, { useRef } from 'react'
import {FaBell} from 'react-icons/fa'
import styles from '../styles/jednoobavjestenje.css'
import { useState } from 'react'

const Obavjestenje = ({naslov,opis,id,datumKreiranja}) => {
  const [visible,setVisible] = useState(false);



  return (
    <div className = "jednoObavjestenje" key = {id}  onClick = {() => {setVisible(!visible)}}>
       
       <div id = "vrijemeNaslov">
          <span id = "vrijemeObavjestenja">{new Date(datumKreiranja).toLocaleString()}</span>
          <h2 className = "naslovObavjestenje">
            {naslov}
          </h2>
       </div>

       <div className={`tekstObavjestenja ${visible === true ? 'visible' : ''}`}>
        <p>{opis}</p>
        <button id = "oznaciProcitano">Označite kao pročitano</button>

       </div>


    </div>
  )
}

export default Obavjestenje