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
  const [neprocitana,setNeprocitana] = useState([]);

  const fetchObavjestenja = async () => {
    try {

      const response = await axios.get(`/obavjestenje/${imePredmeta}/${imeSmjera}/${imeFakulteta}`)
      const response2 = await axios.get(`/obavjestenje/neprocitanaObavjestenja/${imePredmeta}/${imeSmjera}/${imeFakulteta}`)
      console.log(response.data);

      //console.log(response2.data);
      console.log('risdpons',response.data);
      
      setObavjestenja(response.data);
      setNeprocitana(response2.data);

    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchObavjestenja();
  },[])

  return (
    <main className='not-body'>
      <div id = "glavniDivObavjestenja">
        <h1>{imePredmeta}</h1>

        {user.rola === 'Profesor' && <button className = "okaciObavjestenje"><Link to = {`/newNotification/${imePredmeta}/${imeSmjera}/${imeFakulteta}`} id = "novoObavjestenjeLink">Okačite novo obavještenje</Link></button>}

        <div className = "obavjestenjaPredmet">
          {obavjestenja.map((obavjestenje) => <Obavjestenje setNeprocitana = {setNeprocitana} neProcitana = {neprocitana} naslov = {obavjestenje.naslov} opis = {obavjestenje.opis} key = {obavjestenje.id_obavjestenja} id = {obavjestenje.id_obavjestenja}   datumKreiranja = {obavjestenje.datum_kreiranja}/>)}
        </div>

      </div>
    </main> 

    
  )

}

export default ObavjestenjePredmet