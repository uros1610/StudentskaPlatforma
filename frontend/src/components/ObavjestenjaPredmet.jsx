import React, { useContext } from 'react'
import Obavjestenje from './JednoObavjestenje'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import styles from '../styles/obavjestenjapredmet.css'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Pagination from './Pagination'


const ObavjestenjePredmet = () => {
  const {imePredmeta,imeSmjera,imeFakulteta} = useParams();

  const [obavjestenja,setObavjestenja] = useState([]);
  const {user} = useContext(AuthContext);
  const [neprocitana,setNeprocitana] = useState([]);
  const [ukupno,setUkupno] = useState(0);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [currentPage, setCurrentPage] = useState(1);
  const subjPerPage = 6;

  const fetchNeprocitanaIbroj = async () => {
    try {
      const response2 = await axios.get(`/obavjestenje/neprocitanaObavjestenja/${imePredmeta}/${imeSmjera}/${imeFakulteta}`)
      const response3 = await axios.get(`/obavjestenje/brojObavjestenja/${imePredmeta}/${imeSmjera}/${imeFakulteta}`)
      setNeprocitana(response2.data);
      setUkupno(response3.data[0].brojObavjestenja);
    }
    catch(err) {
      console.log(err);
    }
  }

  const fetchObavjestenja = async () => {
    try {

      const response = await axios.get(`/obavjestenje/${imePredmeta}/${imeSmjera}/${imeFakulteta}/${currentPage}`)
    
      console.log(response.data);

      console.log('risdpons',response.data);
      
      setObavjestenja(response.data);
      

    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchObavjestenja();
  },[currentPage])

  useEffect(() => {
    fetchNeprocitanaIbroj();
  },[])

  return (
    <main className='not-body'>
      <div id = "glavniDivObavjestenja">
        <h1>{imePredmeta}</h1>

        {user.rola === 'Profesor' && <button className = "okaciObavjestenje"><Link to = {`/newNotification/${imePredmeta}/${imeSmjera}/${imeFakulteta}`} id = "novoObavjestenjeLink">Okačite novo obavještenje</Link></button>}

        <div className = "obavjestenjaPredmet">
          {obavjestenja.map((obavjestenje) => <Obavjestenje obavjestenja={obavjestenja} setObavjestenja={setObavjestenja} setNeprocitana = {setNeprocitana} neProcitana = {neprocitana} naslov = {obavjestenje.naslov} opis = {obavjestenje.opis} key = {obavjestenje.id_obavjestenja} id = {obavjestenje.id_obavjestenja}   datumKreiranja = {obavjestenje.datum_kreiranja}/>)}
        </div>

        <Pagination itemsPerPage={subjPerPage}
                totalItems={ukupno}
                paginate={paginate}
                currentPage={currentPage}/>
                

      </div>


    </main> 

    
  )

}

export default ObavjestenjePredmet