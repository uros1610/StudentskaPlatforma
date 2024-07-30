import React from 'react';
import '../styles/adminpanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faBell, faBook, faUser, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import PredmetContext from '../context/PredmetContext';
import InsertProvjera from './InsertProvjera';

const AdminPanel = () => {
  const [fakulteti, setFakulteti] = useState([]);
  const [smjerovi, setSmjerovi] = useState([]);
  const [predmetiFiltrirani, setPredmetiFiltrirani] = useState([]);
  const { predmeti, fetchPredmeti } = useContext(PredmetContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [odabranFakultet, setOdabranFakultet] = useState();
  const [odabranSmjer, setOdabranSmjer] = useState();
  const [odabranPredmet, setOdabranPredmet] = useState();

  const [open, setOpen] = useState(false);

  if (!user || user.rola === 'Student') {
    navigate('/home');
  }

  const handleFakultetChange = (event) => {
    setOdabranFakultet(event.target.value);
  };

  const handleSmjerChange = (event) => {
    setOdabranSmjer(event.target.value);
  };

  const handlePredmetChange = (event) => {
    setOdabranPredmet(event.target.value);
  };

  useEffect(() => {
    if (user.rola === 'Profesor') {
      fetchPredmeti();
      fetchFakulteti();
    }
  }, [user]);

  const fetchFakulteti = async () => {
    try {
      const response = await axios.get(`/profesor/sviFakultetiProfesora`);
      setFakulteti(response.data);
      setOdabranFakultet(response.data[0]?.imeFakulteta);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSmjerovi = async () => {
    try {
      if (odabranFakultet) {
        const response = await axios.get(`/profesor/sviSmjeroviProfesora/${odabranFakultet}`);
        setSmjerovi(response.data);
        setOdabranSmjer(response.data[0]?.imeSmjera);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (odabranFakultet) {
      fetchSmjerovi();
    }
  }, [odabranFakultet]);

  useEffect(() => {
    const filtrirani = predmeti.filter(
      (predmet) => predmet.imeFakulteta === odabranFakultet && predmet.imeSmjera === odabranSmjer
    );
    setPredmetiFiltrirani(filtrirani);
    console.log(filtrirani);
    if (filtrirani.length > 0) {
      setOdabranPredmet(filtrirani[0].imePredmeta);
    } else {
      setOdabranPredmet(null);
    }
  }, [odabranSmjer, predmeti]);

  return (
    <main id="admin-panel-body">
      {user.rola === 'Profesor' && (
        <DropdownMenu
          handleFakultetChange={handleFakultetChange}
          handleSmjerChange={handleSmjerChange}
          fakulteti={fakulteti}
          smjerovi={smjerovi}
          predmeti={predmetiFiltrirani}
          handlePredmetChange={handlePredmetChange}
        />
      )}

      <div id="admin-panel-main">
        <div className="row">
          <Link to={`/insert-results/${odabranPredmet}/${odabranSmjer}/${odabranFakultet}`} className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faSquarePollVertical} className="admin-icons" />
              <h2 className="admin-title">Upis rezultata</h2>
            </div>
          </Link>

          <Link to={`/newNotification/${odabranPredmet}/${odabranSmjer}/${odabranFakultet}`} className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faBell} className="admin-icons" />
              <h2 className="admin-title">Okačite</h2>
              <h2 className="admin-title">novo</h2>
              <h2 className="admin-title">obavještenje</h2>
            </div>
          </Link>
        </div>

        <div className="row">
          <Link to={`/edit-materials/${odabranPredmet}/${odabranSmjer}/${odabranFakultet}`} className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faBook} className="admin-icons" />
              <h2 className="admin-title">Materijali</h2>
            </div>
          </Link>

          <div className="admin-card" onClick={(e) => { e.preventDefault(); setOpen(true); }}>
            <FontAwesomeIcon icon={faBookOpen} className="admin-icons" />
            <h2 className="admin-title">Dodajte</h2>
            <h2 className="admin-title">provjeru</h2>

          </div>

          {open && <InsertProvjera open={open} setOpen={setOpen} imePredmeta={odabranPredmet} imeSmjera={odabranSmjer} imeFakulteta={odabranFakultet} />}

        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
