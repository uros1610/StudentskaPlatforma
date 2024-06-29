import React, { useContext, useEffect } from 'react';
import Predmet from './Predmet';
import AuthContext from '../context/AuthContext';
import PredmetContext from '../context/PredmetContext';
import styles from '../styles/obavjestenjaglavna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';

const ObavjestenjaGlavnaStranica = () => {
    const { user } = useContext(AuthContext);
    const { predmeti, fetchPredmeti } = useContext(PredmetContext);



    // napomena, ovo ide samo za profesora,kad oce da kaci obavjestenja, radim ovo da bih testirao da vidim radi li upit
    const [fakulteti,setFakulteti] = useState([]); // izvlacenje fakulteta
    const [smjerovi,setSmjerovi] = useState([]);   // izvlacenje smjerova
    const [predmetiFiltrirani,setPredmetiFiltrirani] = useState([]);

    const [odabranFakultet,setOdabranFakultet] = useState(); // onaj koji je u dropdown-u odabran;
    const [odabranSmjer,setOdabranSmjer] = useState();

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
        if (user) {
            fetchFakulteti();
            fetchPredmeti();
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

    

    if (!user) {
        return <div>Please log in to see the notifications.</div>;
    }

    return (
        
        <div className="sviPredmetiObavjestenja">
            <div id='not-ttl'>
                <FontAwesomeIcon icon={faBell} id='not-icn' />
                <h1>Obavještenja</h1>
            </div>

            {user.rola === 'Profesor' && <div className = "selectDiv">
                <select onChange={handleFakultetChange}>
                    {fakulteti.map((fakultet) => (
                        <option value = {fakultet.imeFakulteta}>{fakultet.imeFakulteta}</option>
                    ))}
                </select>
                
                <select onChange={handleSmjerChange}>
                    {smjerovi.map((smjer) => (
                        <option value = {smjer.imeSmjera}>{smjer.imeSmjera}</option>
                    ))}
                </select>
            </div>}

            {user.rola === 'Profesor' && predmetiFiltrirani.map((predmet) => (
                <Predmet
                    
                    imePredmeta={predmet.imePredmeta}
                    imeSmjera={predmet.imeSmjera}
                    imeFakulteta={predmet.imeFakulteta}
                />
            ))}
            {user.rola === 'Student' && predmeti.map((predmet) => (
                <Predmet
                    
                    imePredmeta={predmet.imePredmeta}
                    imeSmjera={predmet.imeSmjera}
                    imeFakulteta={predmet.imeFakulteta}
                />
            ))}
        </div>
    );
};

export default ObavjestenjaGlavnaStranica;
