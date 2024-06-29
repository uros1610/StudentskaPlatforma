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

const SubjectMaterials = () => {

    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();
    const {predmeti,fetchPredmeti} = useContext(PredmetContext);
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleDownload = async (fileName) => {
        try {
          // Make a GET request to download the file
          const response = await axios.get(`/materijal/PreuzmiMaterijal/${fileName}`, {
            responseType: 'blob', // Specify the response type as blob
          });

          const contentType = response.headers['content-type'] || response.headers['Content-Type'];
      
          // Create a Blob object from the response data
          const blob = new Blob([response.data], { type: contentType }); // Ensure content type is 'application/pdf'
      
          // Create a URL for the blob
          const url = window.URL.createObjectURL(blob);
      
          // Create a link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName); // Set the download attribute to the filename
      
          // Append the link to the body and simulate click to trigger download
          document.body.appendChild(link);
          link.click();
      
          // Clean up: remove the link and revoke the URL object
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
            const response = await axios.get(`/materijal/MaterijaliPredmeta/${imePredmeta}/${imeSmjera}/${imeFakulteta}`);
            setMaterijali(response.data);
            console.log(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMaterijali();
    },[])
    

    return (
        <main id="materials-body">
            <div id="materials-h1">
                <FontAwesomeIcon icon={faBook} id="mat-icn" />
                <h1>Materijali</h1>
            </div>
            
            <div id="materials-cards">
            {materijali?.map(materijal => (

                <div className="materials-card" onClick = {(e) => handleDownload(materijal.putanja)}>
                    <h2 className="materials-title">{materijal.putanja}</h2>
                    
                </div>       
            ))}
            </div>

            

    </main>
  )
}

export default SubjectMaterials