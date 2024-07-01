import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from '../styles/insertresultsmainpage.css'
import DropdownMenu from './DropdownMenu'
import PredmetContext from '../context/PredmetContext'
import Predmet from './Predmet'

const InsertResults = () => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const [fakulteti,setFakulteti] = useState([]);
    const [smjerovi,setSmjerovi] = useState([]);
    const [predmetiFiltrirani,setPredmetiFiltrirani] = useState([]);
    const {predmeti,fetchPredmeti} = useContext(PredmetContext)

    const [odabranFakultet,setOdabranFakultet] = useState();
    const [odabranSmjer,setOdabranSmjer] = useState();

    
    

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();

    if(!user || user.rola === 'Student') {
        navigate('/home');
    }

   

    const handleFakultetChange = (event) => {
        setOdabranFakultet(event.target.value);
    };

    const handleSmjerChange = (event) => {
        setOdabranSmjer(event.target.value);
    };

   

    const fetchFakulteti = async () => {
        try {
        const response = await axios.get(`/profesor/sviFakultetiProfesora`);
        setFakulteti(response.data);
        setOdabranFakultet(response.data[0].imeFakulteta);

        }
        
        catch(err) {
            console.log(err)
        }
    }

    const fetchSmjerovi = async () => {
        try {
            const response = await axios.get(`/profesor/sviSmjeroviProfesora/${odabranFakultet}`);
            setSmjerovi(response.data);
            setOdabranSmjer(response.data[0].imeSmjera);
            console.log(response);
        }
        catch(err) {
            console.log(err);
        }
    }


    useEffect(() => {
        
        if(user.rola === 'Profesor') {
            fetchPredmeti();
            fetchFakulteti();

        }
    }, [user]);

    useEffect(() => {
        fetchSmjerovi();
    },[odabranFakultet])

    useEffect(() => {
        setPredmetiFiltrirani(predmeti.filter((predmet) => predmet.imeFakulteta === odabranFakultet && predmet.imeSmjera === odabranSmjer));

    },[odabranSmjer])

    useEffect(() => {
        console.log(odabranSmjer,odabranFakultet);
        console.log(predmetiFiltrirani);
    },[predmetiFiltrirani])


    
  return (
    <div id = "resultsDiv">

        {user.rola === 'Profesor' && <DropdownMenu handleFakultetChange = {handleFakultetChange} handleSmjerChange = {handleSmjerChange} fakulteti = {fakulteti} smjerovi = {smjerovi}/>}

        <div id = "subjectsDiv">
            {user.rola === 'Profesor' && predmetiFiltrirani.map((predmet) => (
                    <Predmet
                        
                        imePredmeta={predmet.imePredmeta}
                        imeSmjera={predmet.imeSmjera}
                        imeFakulteta={predmet.imeFakulteta}
                        type = "insert-results"
                    />
                ))}
        </div>  
        
    </div>
  )
}

export default InsertResults