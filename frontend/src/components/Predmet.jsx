import React, { useContext } from 'react'
import styles from '../styles/predmet.css'
import {FaBell} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
const Predmet = ({imePredmeta,imeSmjera,imeFakulteta}) => {

  const {user} = useContext(AuthContext);

  const [broj,setBroj] = useState();

  const fetchObavjestenja = async () => {
    try {
    const response = await axios.get(`/obavjestenje/brojNeprocitanih/${imePredmeta}/${imeSmjera}/${imeFakulteta}`);
    setBroj(response.data[0].brojNeprocitanih);

    }

    catch(err) {

    }

  }

  useEffect(() => {
    fetchObavjestenja();
  },[])

  return (
    <Link className = "predmetDiv" to = {`/notifications/${imePredmeta}/${imeSmjera}/${imeFakulteta}`}>
        
        {user.rola === 'Student' && broj > 0 && 
          <div id = "brojNeprocitanihObavjestenja">
            {broj}
          </div>
        }

        <h1 className = "imePredmeta">{imePredmeta}</h1>
        <FaBell className = "obavjestenjeIkonica"/>

    </Link>
  )
}

export default Predmet