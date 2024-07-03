import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
import PredmetContext from '../context/PredmetContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const SubjectMaterials = () => {

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();
    const {predmeti,fetchPredmeti} = useContext(PredmetContext);
    const {user} = useContext(AuthContext)
    const [ukupno,setUkupno] = useState(0);
    const navigate = useNavigate();
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [currentPage, setCurrentPage] = useState(1);
    const subjPerPage = 6;

    const handleDownload = async (fileName) => {
        try {
          
          const response = await axios.get(`/materijal/PreuzmiMaterijal/${fileName}`, {
            responseType: 'blob', 
          });

          const contentType = response.headers['content-type'] || response.headers['Content-Type'];
      
          const blob = new Blob([response.data], { type: contentType });
      
          
          const url = window.URL.createObjectURL(blob);
      
          
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
      
        
          document.body.appendChild(link);
          link.click();
      
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Download error:', error);
        }
      };

    useEffect(() => {
    
        if(user) {
            fetchPredmeti();
        }
       
    },[user])

    useEffect(() => {
        
        console.log(predmeti);
        const found = predmeti.find(predmet => predmet.imePredmeta === imePredmeta && predmet.imeSmjera === imeSmjera && predmet.imeFakulteta === imeFakulteta)
        if(!found) {
            navigate('/home');
        }
    },[predmeti])

    const [materijali,setMaterijali] = useState();

    const fetchMaterijali = async () => {
        try {
            console.log(imePredmeta,imeSmjera,imeFakulteta);
            const response = await axios.get(`/materijal/MaterijaliPredmeta/${imePredmeta}/${imeSmjera}/${imeFakulteta}/${currentPage}`);
            const response2 = await axios.get(`/materijal/UkupanBrojMaterijala/${imePredmeta}/${imeSmjera}/${imeFakulteta}`);
            setUkupno(response2.data[0].brojMaterijala);
            setMaterijali(response.data);
            console.log(response2.data);
            console.log(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMaterijali();
    },[currentPage])
    

    return (
        <main id="materials-body">
            <div id="materials-h1">
                <FontAwesomeIcon icon={faBook} id="mat-icn" />
                <h1>Materijali</h1>
            </div>
            
            <div id="materials-cards">
            {materijali?.map(materijal => (

                <div className="materials-card" onClick = {(e) => handleDownload(materijal.putanja)}>
                    <h2 className="materials-title">{materijal.naslov}</h2>
                    
                </div>       
            ))}
            </div>

        <Pagination paginate={paginate} currentPage={currentPage} totalItems={ukupno} itemsPerPage={subjPerPage}/>

    </main>
  )
}

export default SubjectMaterials