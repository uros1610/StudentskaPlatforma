import React, { useContext, useEffect } from 'react';
import Predmet from './Predmet';
import AuthContext from '../context/AuthContext';
import PredmetContext from '../context/PredmetContext';
import styles from '../styles/obavjestenjaglavna.css';

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
