import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/editmaterials.css';
import AddMaterial from './AddMaterial';
import axios from 'axios';
import Pagination from './Pagination'

const EditMaterials = () => {
    const {imePredmeta,imeSmjera,imeFakulteta} = useParams();
    const [materials,setMaterials] = useState([]);
    const [ukupno,setUkupno] = useState(0);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [currentPage, setCurrentPage] = useState(1);
    const subjPerPage = 6;

    
    

    const [sections,setSections] = useState([]);

    const fetchMaterijali = async () => {
        try {
            const response = await axios.get(`/materijal/MaterijaliPredmeta/${imePredmeta}/${imeSmjera}/${imeFakulteta}/${currentPage}`);
            const response2 = await axios.get(`/materijal/UkupanBrojMaterijala/${imePredmeta}/${imeSmjera}/${imeFakulteta}`);
            console.log(response.data);
            setMaterials(response.data);
            setUkupno(response2.data[0].brojMaterijala)
        }
        catch(err) {

        }
    }

    const handleDeleteMaterijala = async (id,putanja) => {
        try {
            console.log(id);
            const response = await axios.delete(`/materijal/ObrisiMaterijal/${id}/${putanja}`);
            setMaterials(materials.filter(material => material.id !== id))
            alert("Uspjesno obrisan materijal!");

        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchMaterijali();
    },[currentPage])

    const [showAddMaterial, setShowAddMaterial] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);

 

    const handleAddMaterialClose = (material) => {
      
        setShowAddMaterial(false);
        setCurrentSection(null);
    };


    return (
        <div id="edit-materials">
            <header className="edit-header">
                <h1>Uređivanje materijala za Predmet {imePredmeta}</h1>
                
            </header>

            <div className="sections">
                
                        <div className="materials">
                            {materials.map((material, index) => (
                                <div key={material.idMaterijala} className="material">
                                    <div className="material-info">
                                        
                                        <h2>{material.naslov}</h2>

                                        <button className='btn-delete' onClick = {(e) => {handleDeleteMaterijala(material.id,material.putanja)}}>
                                            <FontAwesomeIcon icon = {faTrash}/>
                                        </button>
                                        
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                        <div className="section-actions">
                            
                        </div>
                   
            </div>

            <button className="btn-add-material" onClick={(e) => {
                setShowAddMaterial(true);
            }}>
                    <FontAwesomeIcon icon={faPlus} />
                    
                </button>

            {showAddMaterial && <AddMaterial onClose={handleAddMaterialClose} materials={materials} setMaterials={setMaterials} />}

            <Pagination itemsPerPage={subjPerPage}
                totalItems={ukupno}
                paginate={paginate}
                currentPage={currentPage}/>
        </div>
    );
};

export default EditMaterials;
