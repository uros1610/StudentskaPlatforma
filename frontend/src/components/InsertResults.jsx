import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const InsertResults = () => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const [filter,setFilter] = useState({
        indeks:"",
        imeStudenta:"",
        prezimeStudenta:"",
    });

    

    const [studenti,setStudenti] = useState();

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();

    if(!user || user.rola === 'Student') {
        navigate('/home');
    }

    const handleChange = (e) => {
        const id = e.target.id;

        setFilter({...filter,id:e.target.value})
        
    }

    const fetchStudenti = async () => {
        try {
            const response = await axios.get(`/student/${imePredmeta}/${imeSmjera}/${imeFakulteta}?indeks=${filter.indeks}&imeStudenta=${filter.imeStudenta}&prezimeStudenta=${filter.prezimeStudenta}`);
            console.log(response);
            setStudenti(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchStudenti();
    },[filter])

  return (
    <div>
        <input id = "indeks" onChange={handleChange}/>
        <input id = "ime" onChange={handleChange}/>
        <input id = "prezime" onChange={handleChange}/>
    </div>
  )
}

export default InsertResults