import React, { useContext, useEffect } from 'react';
import Predmet from './Predmet';
import AuthContext from '../context/AuthContext';
import PredmetContext from '../context/PredmetContext';
import styles from '../styles/obavjestenjaglavna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import DropdownMenu from './DropdownMenu';
import { useNavigate } from 'react-router-dom';

const ObavjestenjaGlavnaStranica = () => {
   
    const [fakulteti, setFakulteti] = useState([]);
    const [smjerovi, setSmjerovi] = useState([]);
    const [predmetiFiltrirani, setPredmetiFiltrirani] = useState([]);
    const { predmeti, fetchPredmeti } = useContext(PredmetContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const [odabranFakultet, setOdabranFakultet] = useState();
    const [odabranSmjer, setOdabranSmjer] = useState();
    const [odabranPredmet, setOdabranPredmet] = useState();
  
    const [open, setOpen] = useState(false);
  
    if (!user || user.rola === 'Student') {
      navigate('/home');
    }
  
    const handleFakultetChange = (event) => {
      setOdabranFakultet(event.target.value);
    };
  
    const handleSmjerChange = (event) => {
      setOdabranSmjer(event.target.value);
    };
  
    const handlePredmetChange = (event) => {
      setOdabranPredmet(event.target.value);
    };
  
    useEffect(() => {
      if (user.rola === 'Profesor') {
        fetchPredmeti();
        fetchFakulteti();
      }
    }, [user]);
  
    const fetchFakulteti = async () => {
      try {
        const response = await axios.get(`/profesor/sviFakultetiProfesora`);
        setFakulteti(response.data);
        setOdabranFakultet(response.data[0]?.imeFakulteta);
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchSmjerovi = async () => {
      try {
        if (odabranFakultet) {
          const response = await axios.get(`/profesor/sviSmjeroviProfesora/${odabranFakultet}`);
          setSmjerovi(response.data);
          setOdabranSmjer(response.data[0]?.imeSmjera);
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      if (odabranFakultet) {
        fetchSmjerovi();
      }
    }, [odabranFakultet]);
  
    useEffect(() => {
      const filtrirani = predmeti.filter(
        (predmet) => predmet.imeFakulteta === odabranFakultet && predmet.imeSmjera === odabranSmjer
      );
      setPredmetiFiltrirani(filtrirani);
      console.log(filtrirani);
      if (filtrirani.length > 0) {
        setOdabranPredmet(filtrirani[0].imePredmeta);
      } else {
        setOdabranPredmet(null);
      }
    }, [odabranSmjer, predmeti]);

    
    if (!user) {
        return <div>Please log in to see the notifications.</div>;
    }

    return (
        
        <div className="sviPredmetiObavjestenja">
            <div id='not-ttl'>
                <FontAwesomeIcon icon={faBell} id='not-icn' />
                <h1>Obavještenja</h1>
            </div>

            {user.rola === 'Profesor' && <DropdownMenu handleFakultetChange = {handleFakultetChange} handleSmjerChange = {handleSmjerChange} fakulteti = {fakulteti} smjerovi = {smjerovi} predmeti={predmetiFiltrirani} handlePredmetChange={handlePredmetChange} type = "test"/>}

            {user.rola === 'Profesor' && predmetiFiltrirani.map((predmet) => (
                <Predmet
                    
                    imePredmeta={predmet.imePredmeta}
                    imeSmjera={predmet.imeSmjera}
                    imeFakulteta={predmet.imeFakulteta}
                    type = "notifications"
                />
            ))}
            {user.rola === 'Student' && predmeti.map((predmet) => (
                <Predmet
                    
                    imePredmeta={predmet.imePredmeta}
                    imeSmjera={predmet.imeSmjera}
                    imeFakulteta={predmet.imeFakulteta}
                    type = "notifications"

                />
            ))}
        </div>
    );
};

export default ObavjestenjaGlavnaStranica;
