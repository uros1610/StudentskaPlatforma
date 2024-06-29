import React, { useContext, useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import styles from '../styles/jednoobavjestenje.css';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Obavjestenje = ({ naslov, opis, id, datumKreiranja, neProcitana, setNeprocitana }) => {
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [neprocitano, setNeprocitano] = useState();



  const oznaciProcitano = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`/obavjestenje/neprocitano/${id}`);
      setNeprocitano(false);
      setNeprocitana(neProcitana.filter(neprocitano => neprocitano.id_obavjestenja !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setNeprocitano(neProcitana.some(neprocitano => neprocitano.id_obavjestenja === id));

  },[neProcitana])

  return (
    <div className="jednoObavjestenje" key={id} onClick={() => setVisible(!visible)}>
      <div id="vrijemeNaslov">
        <span id="vrijemeObavjestenja">{new Date(datumKreiranja).toLocaleString()}</span>
        <h2 className="naslovObavjestenje">
          {naslov}
        </h2>
      </div>

      {neprocitano && <FaBell id="zvonceNeprocitano" />}

      <div className={`tekstObavjestenja ${visible ? 'visible' : ''}`}>
        <p>{opis}</p>
        {user.rola === 'Student' && neprocitano && (
          <button id="oznaciProcitano" onClick={oznaciProcitano}>Označite kao pročitano</button>
        )}
        {user.rola === 'Profesor' && (
          <div id="dugmadDiv">
            <button
              id="oznaciProcitano"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/editNotification/${id}`);
              }}
            >
              Izmijeni
            </button>
            <button id="oznaciProcitano">Izbriši</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Obavjestenje;
