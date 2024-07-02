import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import '../styles/AdminMaterials.css';
import AuthContext from '../context/AuthContext';

const AdminMaterials = () => {
    const { user } = useContext(AuthContext);

 
    const subjects = [
        { id: 1, name: 'Predmet 1' },
        { id: 2, name: 'Predmet 2' },
        { id: 3, name: 'Predmet 3' },
    ];

    return (
        <div id="admin-materials">
            <header className="admin-header">
                <h1><FontAwesomeIcon icon={faBook} className="admin-icon" /> Upravljanje materijalima </h1>
            </header>

            <section className="admin-section">
                <div className="subject-cards">
                    {subjects.map(subject => (
                        <Link key={subject.id} to={`/admin/edit-materials/${subject.id}`} className="subject-card">
                            <h3>{subject.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminMaterials;
