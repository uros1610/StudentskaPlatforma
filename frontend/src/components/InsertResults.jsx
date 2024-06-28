import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from '../styles/insertresults.css'

const InsertResults = () => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [filter,setFilter] = useState({
        indeks:"",
        imeStudenta:"",
        prezimeStudenta:"",
    });

    

    const [studenti,setStudenti] = useState([]);
    const [rezultati,setRezultati] = useState([]);

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();

    if(!user || user.rola === 'Student') {
        navigate('/home');
    }

    const handleChange = (e) => {
        const id = e.target.id;

        const newObj = {...filter};

        newObj[id] = e.target.value;

        setFilter(newObj);
        
        
    }

    const fetchStudenti = async () => {
        try {
            const response = await axios.get(`/student/${imePredmeta}/${imeSmjera}/${imeFakulteta}?indeks=${filter.indeks}&imeStudenta=${filter.imeStudenta}&prezimeStudenta=${filter.prezimeStudenta}`);
            // console.log(response);
            setStudenti(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchRezultati = async () => {
        try {
            const response = await axios.get(`/profesor/sviRezultati/${imePredmeta}/${imeSmjera}/${imeFakulteta}`);
            console.log(response);
            setRezultati(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
       // console.log(filter);
        fetchStudenti();
        fetchRezultati();
    },[filter])

  return (
    <div id = "resultsDiv">

        <div id = "divInputs">
            <input id = "indeks" onChange={handleChange} placeholder = "Indeks"/>
            <input id = "imeStudenta" onChange={handleChange} placeholder = "Ime studenta" />
            <input id = "prezimeStudenta" onChange={handleChange} placeholder = "Prezime studenta" />
        </div>


        <div id = "allStudents">
            {studenti?.map(student => (<div>{student.imeStudenta} {student.prezimeStudenta} {student.indeks}
            
                

            </div>))}
        </div>
        
    </div>
  )
}

export default InsertResults