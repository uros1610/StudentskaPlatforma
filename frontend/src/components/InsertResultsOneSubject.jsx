import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/insertresultsonesubject.css';

const InsertResultsOneSubject = () => {
    const { imePredmeta, imeSmjera, imeFakulteta } = useParams();

    const [filter, setFilter] = useState({
        indeks: "",
        imeStudenta: "",
        prezimeStudenta: "",
    });

    const [rezultati, setRezultati] = useState([]);
    const [studenti, setStudenti] = useState([]);
    const [sviDomaci, setSviDomaci] = useState([]);
    const [sviKolokvijumi, setSviKolokvijumi] = useState([]);
    const [sviPopravniKolokvijumi, setSviPopravniKolokvijumi] = useState([]);
    const [sviZavrsni, setSviZavrsni] = useState([]);
    const [sviPopravniZavrsni, setSviPopravniZavrsni] = useState([]);
    const [changedResults, setChangedResults] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [id]: value
        }));
    };

    const handleScoreChange = (studentId, id_provjere, newScore) => {
        setChangedResults(prevResults => {
            const studentIndex = prevResults.findIndex(result => result.studentId === studentId);
            if (studentIndex === -1) {
               
                return [...prevResults, { studentId, scores: { [id_provjere]: newScore } }];
            } else {
                
                const updatedResults = [...prevResults];

               
                updatedResults[studentIndex] = {
                    ...updatedResults[studentIndex],
                    scores: {
                        ...updatedResults[studentIndex].scores,
                        [id_provjere]: newScore
                    }
                };
            
                return updatedResults;
            }
        });
    };

    useEffect(() => {
        console.log(changedResults);
    }, [changedResults]);

    const fetchRezultati = async () => {
        try {
            const response = await axios.get(`/profesor/sviRezultati/${imePredmeta}/${imeSmjera}/${imeFakulteta}`);
            const data = response.data;
            console.log(data);
            setRezultati(data);
            const filteredData = data.filter(student => student.korisnickoime_studenta === data[0].korisnickoime_studenta);
            setSviKolokvijumi(filteredData.filter(t => t.ime_provjere === 'Kolokvijum'));
            setSviPopravniKolokvijumi(filteredData.filter(t => t.ime_provjere === 'Popravni kolokvijum'));
            setSviZavrsni(filteredData.filter(t => t.ime_provjere === 'Ispit'));
            setSviPopravniZavrsni(filteredData.filter(t => t.ime_provjere === 'Popravni ispit'));
            setSviDomaci(filteredData.filter(t => t.ime_provjere === 'Domaci'));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchStudenti = async () => {
        try {
            const response = await axios.get(`/student/${imePredmeta}/${imeSmjera}/${imeFakulteta}`, {
                params: {
                    indeks: filter.indeks,
                    imeStudenta: filter.imeStudenta,
                    prezimeStudenta: filter.prezimeStudenta
                }
            });
            console.log(response.data);
            setStudenti(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSave = async () => {
        console.log(changedResults);
        try {
            const response = await axios.put(`/student/updateRezultat`, changedResults);
            console.log(response.data);
            alert('Uspjesno Sacuvano!');
            // Optionally refetch data or give user feedback
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStudenti();
        fetchRezultati();
    }, [filter]);

    return (
        <div id = "wrapForResults">
            <h1>Upis rezultata</h1>
            <div id="mainDivForResults">
                <div id="searchDiv">
                    <input id="indeks" placeholder="Indeks" onChange={handleChange} value={filter.indeks} />
                    <input id="imeStudenta" placeholder="Ime studenta" onChange={handleChange} value={filter.imeStudenta} />
                    <input id="prezimeStudenta" placeholder="Prezime studenta" onChange={handleChange} value={filter.prezimeStudenta} />
                </div>
                <table id="resultsTable">
                    <thead id="resultsTableHeadRow">
                        <tr>
                            <th>Student</th>
                            <th>Indeks</th>
                            {sviDomaci.map((domaci, idx) => <th key={`domaci-${idx}`}>Domaci {idx + 1}</th>)}
                            {sviKolokvijumi.map((kolokvijum, idx) => <th key={`kolokvijum-${idx}`}>Kolokvijum {idx + 1}</th>)}
                            {sviPopravniKolokvijumi.map((popravniKolokvijum, idx) => <th key={`popravni-kolokvijum-${idx}`}>Popravni Kolokvijum {idx + 1}</th>)}
                            {sviZavrsni.map((zavrsni, idx) => <th key={`zavrsni-${idx}`}>Zavrsni {idx + 1}</th>)}
                            {sviPopravniZavrsni.map((popravniZavrsni, idx) => <th key={`popravni-zavrsni-${idx}`}>Popravni Zavrsni {idx + 1}</th>)}
                            <th>Ukupno</th>
                        </tr>
                    </thead>
                    <tbody id="bodyOfResultsTable">
                        {studenti.map(student => (
                            <tr key={student.korisnickoIme}>
                                <td>{student.imeStudenta} {student.prezimeStudenta}</td>
                                <td>{student.indeks}</td>
                                {rezultati.filter(rezultat => (rezultat.korisnickoime_studenta === student.korisnickoIme && rezultat.ime_provjere === 'Domaci')).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={changedResults.find(result => result.studentId === student.korisnickoIme)?.scores[provjera.id_provjere] !== undefined
                                                ? changedResults.find(result => result.studentId === student.korisnickoIme).scores[provjera.id_provjere]
                                                : provjera.broj_poena!=-100 ? provjera.broj_poena : ''}
                                            onChange={(e) => handleScoreChange(student.korisnickoIme, provjera.id_provjere, e.target.value)}
                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.korisnickoime_studenta === student.korisnickoIme && rezultat.ime_provjere === 'Kolokvijum')).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={changedResults.find(result => result.studentId === student.korisnickoIme)?.scores[provjera.id_provjere] !== undefined
                                                ? changedResults.find(result => result.studentId === student.korisnickoIme).scores[provjera.id_provjere]
                                                : provjera.broj_poena!=-100 ? provjera.broj_poena : ''}
                                            onChange={(e) => handleScoreChange(student.korisnickoIme, provjera.id_provjere, e.target.value)}
                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.korisnickoime_studenta === student.korisnickoIme && rezultat.ime_provjere === 'Popravni kolokvijum')).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={changedResults.find(result => result.studentId === student.korisnickoIme)?.scores[provjera.id_provjere] !== undefined
                                                ? changedResults.find(result => result.studentId === student.korisnickoIme).scores[provjera.id_provjere]
                                                : provjera.broj_poena!=-100 ? provjera.broj_poena : ''}
                                            onChange={(e) => handleScoreChange(student.korisnickoIme, provjera.id_provjere, e.target.value)}
                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.korisnickoime_studenta === student.korisnickoIme && rezultat.ime_provjere === 'Ispit')).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={changedResults.find(result => result.studentId === student.korisnickoIme)?.scores[provjera.id_provjere] !== undefined
                                                ? changedResults.find(result => result.studentId === student.korisnickoIme).scores[provjera.id_provjere]
                                                : provjera.broj_poena!=-100 ? provjera.broj_poena : ''}
                                            onChange={(e) => handleScoreChange(student.korisnickoIme, provjera.id_provjere, e.target.value)}
                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.korisnickoime_studenta === student.korisnickoIme && rezultat.ime_provjere === 'Popravni ispit')).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={changedResults.find(result => result.studentId === student.korisnickoIme)?.scores[provjera.id_provjere] !== undefined
                                                ? changedResults.find(result => result.studentId === student.korisnickoIme).scores[provjera.id_provjere]
                                                : provjera.broj_poena!=-100 ? provjera.broj_poena : ''}
                                            onChange={(e) => handleScoreChange(student.korisnickoIme, provjera.id_provjere, e.target.value)}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <input
                                        className="numberOfPoints"
                                        value={changedResults.find(result => result.studentId === student.korisnickoIme)?.scores.ukupanBrojPoena !== undefined
                                            ? changedResults.find(result => result.studentId === student.korisnickoIme).scores.ukupanBrojPoena
                                            : student.ukupanBrojPoena}
                                        onChange={(e) => handleScoreChange(student.korisnickoIme, 'ukupanBrojPoena', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button id="saveButton" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default InsertResultsOneSubject;
