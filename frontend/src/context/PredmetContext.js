import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const PredmetContext = createContext({});

export const PredmetContextProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [predmeti, setPredmeti] = useState([]);

    const fetchPredmeti = async () => {
        try {
            if (user) {
                if (user.rola === 'Student') {
                    const response = await axios.get('/student/sviPredmetiStudenta');
                    setPredmeti(response.data);
                } else if (user.rola === 'Profesor') {
                    const response = await axios.get('/profesor/sviPredmetiProfesora');
                    setPredmeti(response.data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch predmeti:', err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPredmeti();
        } else {
            setPredmeti([]);
        }
    }, [user]);

    return (
        <PredmetContext.Provider value={{ predmeti, fetchPredmeti }}>
            {children}
        </PredmetContext.Provider>
    );
};

export default PredmetContext;
