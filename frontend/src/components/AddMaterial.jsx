import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/AddMaterial.css';

const AddMaterial = ({ onClose }) => {
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState('');

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //  logika za upload fajla i komentara
        files.forEach(file => {
            console.log(`File: ${file.name}, Comment: ${comment}`);
        });
        onClose({ name: files.map(file => file.name).join(', '), comment }); // Zatvaranje modalnog prozora nakon dodavanja materijala
    };

    return (
        <div className="add-material-modal">
            <div className="add-material-content">
                <div className="add-material-header">
                    <h2>Dodaj novi materijal</h2>
                    <button className="close-btn" onClick={() => onClose(null)}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="file">Dokument:</label>
                        <div className="input-wrapper">
                            <input type="file" id="file" multiple onChange={handleFileChange} />
                            <label htmlFor="file" className="choose-files-btn">Izaberi fajl</label>
                        </div>
                    </div>
                    {files.length > 0 && (
                        <div className="file-list">
                            <h4>Izabrani fajlovi:</h4>
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="comment">Komentar:</label>
                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-submit">Objavi materijal</button>
                </form>
            </div>
        </div>
    );
};

export default AddMaterial;
