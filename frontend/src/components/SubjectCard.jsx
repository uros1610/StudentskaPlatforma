// src/components/SubjectCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SubjectCard.css';

const SubjectCard = ({ subject }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/admin/subjects/${subject.id}/students`, { state: { subjectName: subject.name } });
  };

  return (
    <div className="subject-card" onClick={handleCardClick}>
      <h2>{subject.name}</h2>
    </div>
  );
};

export default SubjectCard;
