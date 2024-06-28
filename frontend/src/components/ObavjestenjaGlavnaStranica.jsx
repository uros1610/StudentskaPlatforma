import React, { useContext, useEffect } from 'react';
import Predmet from './Predmet';
import AuthContext from '../context/AuthContext';
import PredmetContext from '../context/PredmetContext';
import styles from '../styles/obavjestenjaglavna.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const ObavjestenjaGlavnaStranica = () => {
    const { user } = useContext(AuthContext);
    const { predmeti, fetchPredmeti } = useContext(PredmetContext);

    useEffect(() => {
        if (user) {
            fetchPredmeti();
        }
    }, [user]);

    if (!user) {
        return <div>Please log in to see the notifications.</div>;
    }

    return (
        <div className="sviPredmetiObavjestenja">
            <div id='not-ttl'>
                <FontAwesomeIcon icon={faBell} id='not-icn' />
                <h1>Obavještenja</h1>
            </div>
            {predmeti.map((predmet) => (
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
