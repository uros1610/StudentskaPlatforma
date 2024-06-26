import React, { useContext } from 'react'
import Obavjestenje from './JednoObavjestenje'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import styles from '../styles/obavjestenjapredmet.css'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ObavjestenjePredmet = () => {
  const {imePredmeta,imeSmjera,imeFakulteta} = useParams();

  const [obavjestenja,setObavjestenja] = useState([]);
  const {user} = useContext(AuthContext);

  const fetchObavjestenja = async () => {
    try {

      const response = await axios.get(`/obavjestenje/${imePredmeta}/${imeSmjera}/${imeFakulteta}`)
      console.log(response.data);
      
      setObavjestenja(response.data);

    }
    catch(err) {

    }
  }

  useEffect(() => {
    fetchObavjestenja();
  },[])

  return (
    <div id = "glavniDivObavjestenja">
      <h1>Obavještenja</h1>

      {user.rola === 'Profesor' && <button className = "okaciObavjestenje"><Link to = {`/newNotification/${imePredmeta}/${imeSmjera}/${imeFakulteta}`} id = "novoObavjestenjeLink">Okačite novo obavještenje</Link></button>}

      <div className = "obavjestenjaPredmet">
        {obavjestenja.map((obavjestenje) => <Obavjestenje naslov = {obavjestenje.naslov} opis = {obavjestenje.opis} key = {obavjestenje.id_obavjestenja} id = {obavjestenje.id_obavjestenja}   datumKreiranja = {obavjestenje.datum_kreiranja}/>)}
      </div>

    </div>

    
  )

}

export default ObavjestenjePredmet