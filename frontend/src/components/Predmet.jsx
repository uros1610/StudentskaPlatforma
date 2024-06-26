import React from 'react'
import styles from '../styles/predmet.css'
import {FaBell} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Predmet = ({imePredmeta,imeSmjera,imeFakulteta}) => {
  return (
    <Link className = "predmetDiv" to = {`/notifications/${imePredmeta}/${imeSmjera}/${imeFakulteta}`}>
        
        <h1 className = "imePredmeta">{imePredmeta}</h1>
        <FaBell className = "obavjestenjeIkonica"/>

    </Link>
  )
}

export default Predmet