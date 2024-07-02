// src/components/ManageUsers.jsx
import React from 'react';
import '../styles/ManageUsers.css';
import SubjectCard from './SubjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ManageUsers = () => {
  const subjects = [
    { id: 1, name: 'Matematika' },
    { id: 2, name: 'Fizika' },
    { id: 3, name: 'Hemija' },
   
  ];

  return (
    <div className="manage-users">
      <FontAwesomeIcon icon={faUser} className="admin-icons" />  
      <h1>Upravljanje korisnicima</h1>

      <div className="subject-list">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
