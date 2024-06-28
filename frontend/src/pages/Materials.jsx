import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/materials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import PredmetContext from "../context/PredmetContext";
import AuthContext from "../context/AuthContext";

const Materials = () => {

    const {predmeti,fetchPredmeti} = useContext(PredmetContext);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(user) {
            fetchPredmeti();
        }
    },[user])

    useEffect(() => {
        console.log(predmeti);
    },[predmeti])

    return (
        <main id="materials-body">
            <div id="materials-h1">
                <FontAwesomeIcon icon={faBook} id="mat-icn" />
                <h1>Materijali</h1>
            </div>

            <div id="materials-cards">
            {predmeti.map(predmet => (

                <Link className="materials-card" to = {`/materials/${predmet.imePredmeta}/${predmet.imeSmjera}/${predmet.imeFakulteta}`}>
                    <h2 className="materials-title">{predmet.imePredmeta}</h2>
                    
                </Link>       
            ))}
            </div>

            

        </main>
    );
};

export default Materials;

