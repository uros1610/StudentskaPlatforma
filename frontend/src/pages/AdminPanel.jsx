import React from 'react';
import '../styles/AdminPanel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSquarePollVertical, faBell, faBook,  faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <main id="admin-panel-body">

      <div id="admin-panel-main">
        <div className="row">
      
          <Link to="/admin/results" className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faSquarePollVertical} className="admin-icons" />
              <h2 className="admin-title">Upis rezultata</h2>
            </div>
          </Link>

          <Link to="/admin/notifications" className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faBell} className="admin-icons" />
              <h2 className="admin-title">Obavještenja</h2>
            </div>
          
          </Link>
        </div>

        <div className="row">
          <Link to="/admin/materials" className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faBook} className="admin-icons" />
              <h2 className="admin-title">Materijali</h2>
            </div>
          </Link>

          <Link to="/admin/manage-users" className="admin-links">
            <div className="admin-card">
              <FontAwesomeIcon icon={faUser} className="admin-icons" />
              <h2 className="admin-title">Upravljanje </h2>
              <h2 className="admin-title">korisnicima </h2>            </div>
          </Link>
         
        </div>
      </div>

    </main>
  );
}

export default AdminPanel;
