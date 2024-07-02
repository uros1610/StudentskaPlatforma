import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal'; 

import '../styles/StudentList.css';

const StudentList = () => {
  const location = useLocation();
  const { subjectName } = location.state || { subjectName: 'Predmet' };

  const [students, setStudents] = useState([
    { id: 1, firstName: 'Marko', lastName: 'Marković', index: '2020/1234', username: 'mm1234' },
    { id: 2, firstName: 'Jelena', lastName: 'Janković', index: '2021/5678', username: 'jj5678' },
  ]);

  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', index: '', username: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
    setErrorMessage('');
  };

  const handleAddStudent = () => {
    const { firstName, lastName, index, username } = newStudent;

    if (!firstName || !lastName || !index || !username) {
      setErrorMessage('Molim Vas popunite svako polje.');
      return;
    }

    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({ firstName: '', lastName: '', index: '', username: '' });
    setModalIsOpen(false);
  };

  const handleRemoveStudent = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
  };

  return (
    <div className="student-list">
      <h1>Spisak studenata za predmet: {subjectName}</h1>
      <button className="add-student-button" onClick={() => setModalIsOpen(true)}>Dodaj studenta</button>
      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Indeks</th>
              <th>Korisničko ime</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.index}</td>
                <td>{student.username}</td>
                <td>
                  <button onClick={() => handleRemoveStudent(student.id)}>Ukloni</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal">
        <h2>Dodaj studenta</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          name="firstName"
          value={newStudent.firstName}
          onChange={handleInputChange}
          placeholder="Ime"
          className={!newStudent.firstName && errorMessage ? 'input-error' : ''}
        />
        <input
          type="text"
          name="lastName"
          value={newStudent.lastName}
          onChange={handleInputChange}
          placeholder="Prezime"
          className={!newStudent.lastName && errorMessage ? 'input-error' : ''}
        />
        <input
          type="text"
          name="index"
          value={newStudent.index}
          onChange={handleInputChange}
          placeholder="Indeks"
          className={!newStudent.index && errorMessage ? 'input-error' : ''}
        />
        <input
          type="text"
          name="username"
          value={newStudent.username}
          onChange={handleInputChange}
          placeholder="Korisničko ime"
          className={!newStudent.username && errorMessage ? 'input-error' : ''}
        />
        <button onClick={handleAddStudent}>Dodaj</button>
        <button onClick={() => setModalIsOpen(false)}>Zatvori</button>
      </Modal>
    </div>
  );
};

export default StudentList;
