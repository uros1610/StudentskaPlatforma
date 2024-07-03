import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/addmaterial.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddMaterial = ({ onClose,materials,setMaterials}) => {
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState('');
    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();
    
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const uploadPromises = files.map(async file => {
                const formData = new FormData();
                formData.append('ime_predmeta', imePredmeta);
                formData.append('ime_smjera', imeSmjera);
                formData.append('ime_fakulteta', imeFakulteta);
                formData.append('ime_fajla', file.name);
                formData.append('naslov', comment);
                formData.append('file', file);
    
                const response = await axios.post('/materijal/PostaviMaterijal', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                setMaterials([{naslov:comment,putanja:file.name},...materials])
    
                console.log(response.data);
            });
    
            // Wait for all uploads to complete
            await Promise.all(uploadPromises);
    
            // Call onClose with the names of the uploaded files and the comment
            onClose({ name: files.map(file => file.name).join(', '), comment });
        } catch (err) {
            console.log(err);
        }
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
                        <label htmlFor="comment">Naslov:</label>
                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-submit">Objavi materijal</button>
                </form>
            </div>
        </div>
    );
};

export default AddMaterial;