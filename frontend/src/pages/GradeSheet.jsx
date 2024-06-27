import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import "../styles/pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import "../styles/gradesheet.css";

const predmeti = [
    { id: 1, naziv: "Matematika 1", ocjena: "A", ects: 6 },
    { id: 2, naziv: "Matematika 2", ocjena: "A" },
    { id: 3, naziv: "Matematika 3", ocjena: "A" },
    { id: 4, naziv: "Matematika 4", ocjena: "A" },
    { id: 5, naziv: "Matematika 5", ocjena: "A" },
    { id: 6, naziv: "Matematika 6", ocjena: "A" },
    { id: 7, naziv: "Matematika 7", ocjena: "A" },
    { id: 8, naziv: "Matematika8",  ocjena: "A" },
    { id: 9, naziv: "Matematika9",  ocjena: "A" },
    { id: 10, naziv: "Matematika 10", ocjena: "A" },
    { id: 11, naziv: "Matematika 11", ocjena: "A" },
    { id: 12, naziv: "Matematika 12", ocjena: "A" },
    { id: 13, naziv: "Matematika 13", ocjena: "A" },
    { id: 14, naziv: "Matematika 14", ocjena: "A" },
    { id: 15, naziv: "Matematika 15", ocjena: "A" },
    { id: 16, naziv: "Matematika 16", ocjena: "A" },
    { id: 17, naziv: "Matematika 17", ocjena: "A" }
];

const GradeSheet = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const subjPerPage = 5;

    // Calculate the indices of the lessons to be shown on the current page
    const indexOfLastSubj = currentPage * subjPerPage;
    const indexOfFirstSubj = indexOfLastSubj - subjPerPage;
    const currentSubj = predmeti.slice(indexOfFirstSubj, indexOfLastSubj);
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
                    </tr>
                </thead>
                <tbody>
                    {currentSubj.map((predmet) => (
                        <tr key={predmet.id}>
                            <td>{predmet.naziv}</td>
                            <td>{predmet.ocjena}</td>
                            <td>{predmet.ects}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={subjPerPage}
                totalItems={predmeti.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default GradeSheet;
