import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const PredmetContext = createContext({});

export const PredmetContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [predmeti, setPredmeti] = useState([]);

    useEffect(() => {
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

        fetchPredmeti();
    }, [user]);

    return <PredmetContext.Provider value={{ predmeti }}>{children}</PredmetContext.Provider>;
};

export default PredmetContext;
