import React from "react";
import { Link } from "react-router-dom";
import "../styles/materials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Materials = () => {
    return (
        <main id="materials-body">
            <div id="materials-h1">
                <FontAwesomeIcon icon={faBook} id="mat-icn" />
                <h1>Materijali</h1>
            </div>

            <div id="materials-cards">
                <div className="row">
                    <div className="materials-card">
                        <h2 className="materials-title">Matematika 1</h2>
                        <ul>
                            <li><Link className="materials-description">Neki materijal</Link></li>
                        </ul>
                    </div>

                    <div className="materials-card">
                        <h2 className="materials-title">Matematika 2</h2>
                        <ul>
                            <li><Link className="materials-description">Neki materijal</Link></li>
                        </ul>                    
                    </div>

                    <div className="materials-card">
                        <h2 className="materials-title">Matematika 3</h2>
                        <ul>
                            <li><Link className="materials-description">Neki materijal</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="materials-card">
                        <h2 className="materials-title">Matematika 4</h2>
                        <ul>
                            <li><Link className="materials-description">Neki materijal</Link></li>
                        </ul>
                    </div>

                    <div className="materials-card">
                        <h2 className="materials-title">Matematika 5</h2>
                        <ul>
                            <li><Link className="materials-description">Neki materijal</Link></li>
                        </ul>
                    </div>

                    <div className="materials-card">
                        <h2 className="materials-title">Matematika 6</h2>
                        <ul>
                            <li><Link className="materials-description">Neki materijal</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Materials;

