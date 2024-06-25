import React from 'react'
import Obavjestenje from './JednoObavjestenje'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import styles from '../styles/obavjestenjapredmet.css'

const ObavjestenjePredmet = () => {
  const {imePredmeta,imeSmjera,imeFakulteta} = useParams();

  const [obavjestenja,setObavjestenja] = useState([]);

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
    <div className = "obavjestenjaPredmet">
       {obavjestenja.map((obavjestenje) => <Obavjestenje naslov = {obavjestenje.naslov} opis = {obavjestenje.opis} key = {obavjestenje.id} datumKreiranja = {obavjestenje.datum_kreiranja}/>)}
    </div>
  )
}

export default ObavjestenjePredmet