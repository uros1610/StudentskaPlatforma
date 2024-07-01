import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useState} from 'react';
import axios from 'axios';
import PredmetContext from '../context/PredmetContext';

const ResultsTest = () => {
    const {user} = useContext(AuthContext);

    const {predmeti,fetchPredmeti} = useContext(PredmetContext);
    const [sviDomaci, setSviDomaci] = useState([]);
    const [sviKolokvijumi, setSviKolokvijumi] = useState([]);
    const [sviPopravniKolokvijumi, setSviPopravniKolokvijumi] = useState([]);
    const [sviZavrsni, setSviZavrsni] = useState([]);
    const [sviPopravniZavrsni, setSviPopravniZavrsni] = useState([]);



    const [rezultati,setRezultati] = useState([]);

    const fetchRezultati = async () => {
        console.log("usao");
        try {
            const response = await axios.get('/student/sviRezultati');
            const data = response.data;
            setRezultati(response.data);
            const filteredData = data.filter(student => student.korisnickoime_studenta === data[0].korisnickoime_studenta);
            setSviKolokvijumi(filteredData.filter(t => t.ime_provjere === 'Kolokvijum'));
            setSviPopravniKolokvijumi(filteredData.filter(t => t.ime_provjere === 'Popravni kolokvijum'));
            setSviZavrsni(filteredData.filter(t => t.ime_provjere === 'Ispit'));
            setSviPopravniZavrsni(filteredData.filter(t => t.ime_provjere === 'Popravni ispit'));
            setSviDomaci(filteredData.filter(t => t.ime_provjere === 'Domaci'));
            console.log(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("usao");
        if(user) {
            console.log("usao");
            fetchPredmeti();
            fetchRezultati();
        }
    },[user])

  
    
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

        return 'F';


    }



  return (
    <div style = {{
        display:'flex',
        flexDirection:'column',
            alignItems:'center',
        justifyContent:'center'

    }}>
        {predmeti.map(predmet => (

            
            <div id = "mainDivForResults">
                
                <h1 style={{
                    color:'#f7941d'
                }}>{predmet.imePredmeta}</h1>

                <table id = "resultsTable">
                <thead id="resultsTableHeadRow">
                        <tr>
                            
                            {sviDomaci.filter(t => t.ime_predmeta === predmet.imePredmeta).map((domaci, idx) => <th key={`domaci-${idx}`}>Domaci {idx + 1}</th>)}
                            {sviKolokvijumi.filter(t => t.ime_predmeta === predmet.imePredmeta).map((kolokvijum, idx) => <th key={`kolokvijum-${idx}`}>Kolokvijum {idx + 1}</th>)}
                            {sviPopravniKolokvijumi.filter(t => t.ime_predmeta === predmet.imePredmeta).map((popravniKolokvijum, idx) => <th key={`popravni-kolokvijum-${idx}`}>Popravni Kolokvijum {idx + 1}</th>)}
                            {sviZavrsni.filter(t => t.ime_predmeta === predmet.imePredmeta).map((zavrsni, idx) => <th key={`zavrsni-${idx}`}>Zavrsni {idx + 1}</th>)}
                            {sviPopravniZavrsni.filter(t => t.ime_predmeta === predmet.imePredmeta).map((popravniZavrsni, idx) => <th key={`popravni-zavrsni-${idx}`}>Popravni Zavrsni {idx + 1}</th>)}
                            <th>Ukupno   /   Ocjena</th>
                        </tr>

                    </thead>

                    <tbody id="bodyOfResultsTable">
                        
                            <tr key={user.korisnickoIme}>
                                
                                {rezultati.filter(rezultat => (rezultat.ime_provjere === 'Domaci' && rezultat.ime_predmeta === predmet.imePredmeta)).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={provjera.broj_poena!=-100 ? provjera.broj_poena : ''}
                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.ime_provjere === 'Kolokvijum' && rezultat.ime_predmeta === predmet.imePredmeta)).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={provjera.broj_poena!=-100 ? provjera.broj_poena : ''}

                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.ime_provjere === 'Popravni kolokvijum' && rezultat.ime_predmeta === predmet.imePredmeta)).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={provjera.broj_poena!=-100 ? provjera.broj_poena : ''}

                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.ime_provjere === 'Ispit' && rezultat.ime_predmeta === predmet.imePredmeta)).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={provjera.broj_poena!=-100 ? provjera.broj_poena : ''}

                                        />
                                    </td>
                                ))}
                                {rezultati.filter(rezultat => (rezultat.ime_provjere === 'Popravni ispit' && rezultat.ime_predmeta === predmet.imePredmeta)).map(provjera => (
                                    <td key={provjera.id_provjere}>
                                        <input
                                            className="numberOfPoints"
                                            value={provjera.broj_poena!=-100 ? provjera.broj_poena : ''}

                                        />
                                    </td>
                                ))}
                                <td>
                                    <input
                                        className="numberOfPoints"
                                        value = {`${predmet.ukupanBrojPoena}  /  ${izracunaj(predmet.ukupanBrojPoena)}`}
                                    />
                                </td>
                            </tr>
                        
                    </tbody>

                </table>
            </div>
            
        ))}
    </div>
  )
}

export default ResultsTest