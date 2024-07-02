import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/EditMaterials.css';
import AddMaterial from './AddMaterial';

const EditMaterials = () => {
    const { subjectId } = useParams();
    const [sections, setSections] = useState([
        {
            id: 1,
            title: 'Uvod ',
            materials: [
                { name: 'Materijal1.pdf', comment: 'Komentar 1' },
                { name: 'Materijal2.pdf', comment: 'Komentar 2' }
            ]
        },
        {
            id: 2,
            title: 'Prva lekcija',
            materials: [
                { name: 'Materijal3.pdf', comment: 'Komentar3' },
                { name: 'Materijal4', comment: 'Komentar4' }
            ]
        }
    ]);
    const [showAddMaterial, setShowAddMaterial] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);

    const handleAddSection = () => {
        setSections([...sections, { id: sections.length + 1, title: '', materials: [] }]);
    };

    const handleSectionTitleChange = (id, title) => {
        setSections(sections.map(section => section.id === id ? { ...section, title } : section));
    };

    const handleAddMaterialClick = (sectionId) => {
        setCurrentSection(sectionId);
        setShowAddMaterial(true);
    };

    const handleAddMaterialClose = (material) => {
        if (material) {
            setSections(sections.map(section => section.id === currentSection ? { ...section, materials: [...section.materials, material] } : section));
        }
        setShowAddMaterial(false);
        setCurrentSection(null);
    };

    const handleMaterialCommentChange = (sectionId, materialIndex, comment) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                const newMaterials = [...section.materials];
                newMaterials[materialIndex] = { ...newMaterials[materialIndex], comment };
                return { ...section, materials: newMaterials };
            }
            return section;
        }));
    };

    const handleDeleteSection = (id) => {
        setSections(sections.filter(section => section.id !== id));
    };

    const handleDeleteMaterial = (sectionId, materialIndex) => {
        setSections(sections.map(section => {
            if (section.id === sectionId) {
                const newMaterials = [...section.materials];
                newMaterials.splice(materialIndex, 1);
                return { ...section, materials: newMaterials };
            }
            return section;
        }));
    };

    return (
        <div id="edit-materials">
            <header className="edit-header">
                <h1>Uređivanje materijala za Predmet {subjectId}</h1>
                <button className="btn-add-section" onClick={handleAddSection}>
                    <FontAwesomeIcon icon={faPlus} /> Dodaj novu sekciju
                </button>
            </header>

            <div className="sections">
                {sections.map(section => (
                    <div key={section.id} className="section-card">
                        <input
                            type="text"
                            className="section-title"
                            placeholder="Naslov sekcije"
                            value={section.title}
                            onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSectionTitleChange(section.id, e.target.value)}
                        />
                        <div className="materials">
                            {section.materials.map((material, index) => (
                                <div key={index} className="material">
                                    <div className="material-info">
                                        <span>{material.name}</span>
                                        <button className="btn-delete" onClick={() => handleDeleteMaterial(section.id, index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    <div className="material-comment">
                                        <input
                                            type="text"
                                            placeholder="Komentar"
                                            value={material.comment || ''}
                                            onChange={(e) => handleMaterialCommentChange(section.id, index, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="section-actions">
                            <button className="btn-add-material" onClick={() => handleAddMaterialClick(section.id)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <button className="btn-delete-section" onClick={() => handleDeleteSection(section.id)}>
                                Obriši sekciju
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddMaterial && <AddMaterial onClose={handleAddMaterialClose} />}
        </div>
    );
};

export default EditMaterials;
