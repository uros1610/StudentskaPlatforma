import React, { useContext, useEffect, useState } from 'react';
import { isLeapYear } from 'date-fns';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import PredmetContext from '../context/PredmetContext';

const Calendar = () => {
    const [isLeap, setIsLeap] = useState(isLeapYear(new Date().getFullYear()));
    const { predmeti, fetchPredmeti } = useContext(PredmetContext);
    const { user } = useContext(AuthContext);
    const [sveProvjere, setSveProvjere] = useState([]);

    const fetchProvjere = async () => {
        try {
            const promises = predmeti.map(predmet =>
                axios.get(`/provjera/${predmet.imePredmeta}/${predmet.imeSmjera}/${predmet.imeFakulteta}`)
            );

            const responses = await Promise.all(promises);
            const allProvjere = responses.flatMap(response => response.data);

            setSveProvjere(allProvjere);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPredmeti();
        }
    }, [user]);

    useEffect(() => {
        if (predmeti.length > 0) {
            fetchProvjere();
        }
    }, [predmeti]);

    useEffect(() => {
        console.log("OVDJE", sveProvjere);
    }, [sveProvjere]);

    const months = [
        { name: 'January', days: 31 },
        { name: 'February', days: isLeap ? 29 : 28 },
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 },
    ];

    return <div>Calendar</div>;
};

export default Calendar;
