import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import PredmetContext from '../context/PredmetContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const SubjectMaterials = () => {

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();
    const {predmeti,fetchPredmeti} = useContext(PredmetContext);
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

   

    useEffect(() => {
    
        if(user) {
            fetchPredmeti();
        }
       
    },[user])

    useEffect(() => {
        
        console.log(predmeti);
        const found = predmeti.find(predmet => predmet.imePredmeta === imePredmeta && predmet.imeSmjera === imeSmjera && predmet.imeFakulteta === imeFakulteta)
        if(!found) {
            navigate('/home');
        }
    },[predmeti])

    const [materijali,setMaterijali] = useState();

    const fetchMaterijali = async () => {
        try {
            // const response = await axios.get() endpoint ovdje koji ilija napravi
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMaterijali();
    },[])

    return (
        <main id="materials-body">
            <div id="materials-h1">
                <FontAwesomeIcon icon={faBook} id="mat-icn" />
                <h1>Materijali</h1>
            </div>

            <div id="materials-cards">
            {predmeti.map(predmet => (

                <Link className="materials-card" to = {`/materials/${predmet.imePredmeta}/${predmet.imeSmjera}/${predmet.imeFakulteta}`}>
                    <h2 className="materials-title">{predmet.imePredmeta}</h2>
                    
                </Link>       
            ))}
            </div>

            

    </main>
  )
}

export default SubjectMaterials