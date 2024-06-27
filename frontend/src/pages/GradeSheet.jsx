import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import "../styles/pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import "../styles/gradesheet.css";
import axios from "axios";
import { useEffect } from "react";

const GradeSheet = () => {



    const [currentPage, setCurrentPage] = useState(1);
    const [ukupno,setUkupno] = useState();
    const [polozeni,setPolozeni] = useState();
    const subjPerPage = 5;


    const fetchPolozeni = async () => {
        try {
            const response = await axios.get(`/polozeni/${currentPage}`);
            setPolozeni(response.data);
        }
        catch(err) {
            console.log(err);
        }
    
    }

    const fetchUkupanBroj = async () => {
        try {
            const response = await axios.get('/polozeni/brojPolozenih');
            setUkupno(response.data[0].brojPolozenih);
            console.log("USAO JE OVDJE",response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUkupanBroj();
    },[])
    
    useEffect(() => {
        fetchPolozeni();
    },[currentPage])
    

    const izracunaj = (brojPoena) => {
        
        if(brojPoena >= 90) {
            return 'A';
        }
        if(brojPoena >= 80) {
            return 'B';
        }
        if(brojPoena >= 70) {
            return 'C';
        }
        if(brojPoena >= 60) {
            return 'D';
        }
        if(brojPoena >= 50) {
            return 'E';
        }


    }

 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="grade-main">

            <div id="grade-title">
                <FontAwesomeIcon icon={faFileLines} id="grade-icn" />
                <h1>Matični list</h1>
            </div>
            <table id="grade-table">
                <thead>
                    <tr id="table-header">
                        <th>Predmet</th>
                        <th>Ocjena</th>
                        <th>ECTS</th>
                        <th>Semestar</th>
                    </tr>
                </thead>
                <tbody>
                    {polozeni?.map((predmet) => (
                        <tr>
                            <td>{predmet.ime_predmeta}</td>
                            <td>{izracunaj(predmet.broj_poena)}</td>
                            <td>{predmet.broj_kredita}</td>
                            <td>{predmet.broj_semestra}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={subjPerPage}
                totalItems={ukupno}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default GradeSheet;
