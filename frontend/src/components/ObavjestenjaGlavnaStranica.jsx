import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Obavjestenje from './JednoObavjestenje';
import AuthContext from '../context/AuthContext';
import Predmet from './Predmet';
import PredmetContext from '../context/PredmetContext';
import styles from '../styles/obavjestenjaglavna.css'

const ObavjestenjaGlavnaStranica = () => {

    const {user} = useContext(AuthContext)
    const {predmeti} = useContext(PredmetContext);


 

  return (
    <div className = "sviPredmetiObavjestenja">{predmeti.map(predmet => <Predmet imePredmeta={predmet.imePredmeta} imeSmjera={predmet.imeSmjera} imeFakulteta={predmet.imeFakulteta}/>)}</div>
  )
}

export default ObavjestenjaGlavnaStranica