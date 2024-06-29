import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import styles from '../styles/novoobavjestenje.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NovoObavjestenje = ({type}) => {

    const [naslov,setNaslov] = useState("");
    const [opis,setOpis] = useState("");
    const navigate = useNavigate();
    const [error,setError] = useState("");
   

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();
    const {id} = useParams();

    const [predmet,setPredmet] = useState(imePredmeta);
    const [smjer,setSmjer] = useState(imeSmjera);
    const [fakultet,setFakultet] = useState(imeFakulteta);

    const klikDugme = async () => {

        if(!opis) {
            setError("Opis");
            return;
        }
        if(!naslov) {
            setError("Naslov");
            return;
        }

        try {
            if(!id) {
                const response = await axios.post(`/obavjestenje/${predmet}/${smjer}/${fakultet}`,{opis,naslov});

                alert("Obavještenje uspješno okačeno!")
                navigate(`/notifications/${predmet}/${smjer}/${fakultet}`);

            }

            else {
                const response = await axios.put(`/obavjestenje/${id}`,{opis,naslov});
                alert("Obavještenje uspješno izmijenjeno!");
                navigate(`/notifications/${predmet}/${smjer}/${fakultet}`);
                
            }


        }
        catch(err) {
            alert("Obavještenje nije uspješno okačeno/izmjenjeno!")
        }

    }

    const fetchObavjestenje = async () => {
        
        try {
            
            const response = await axios.get(`/obavjestenje/${id}`);
            console.log(response);
            setNaslov(response.data[0].naslov);
            setOpis(response.data[0].opis);
            setPredmet(response.data[0].ime_predmeta);
            setSmjer(response.data[0].ime_smjera);
            setFakultet(response.data[0].ime_fakulteta);
        }
        catch(err) {

        }
    }
    useEffect(() => {
        if(id) {
            fetchObavjestenje();
        }
    },[id])

  return (

    <div className = "wrapperDiv">
        <div id = "novoObavjestenjeDiv">

            {error && <p className = "errorPoruka">{`${error} ne može da bude prazan!`}</p>}

            <input id = "naslov" placeholder = "Naslov obavještenja" value = {naslov} onInput = {(e) => {setNaslov(e.target.value); if(error === 'Naslov') {setError("")}}}/>

            <textarea id = "opis" placeholder = "Opis obavještenja" value = {opis} onInput={(e) => {setOpis(e.target.value); if(error === 'Opis') {setError("")}}}/>

            <button className = "okaciObavjestenje" id='novo-btn' onClick = {klikDugme}><span id = "novoObavjestenjeSpan">{!id ? 'Okačite novo obavještenje' : 'Izmijeni obavještenje'}</span></button>

        </div>

    </div>
  )
}

export default NovoObavjestenje