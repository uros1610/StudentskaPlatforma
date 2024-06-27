import React, { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSquarePollVertical, faBell, faBook, faFileLines } from '@fortawesome/free-solid-svg-icons'
import "../styles/home.css"
import { Link } from "react-router-dom"
import { useState,useEffect} from "react"
import axios from "axios"
import AuthContext from "../context/AuthContext"

const Home = () => {

    const [brojNeprocitanih,setBrojNeprocitanih] = useState();
    const {user} = useContext(AuthContext);

    const fetchBrojNeprocitanih = async () => {
        try {
            const response = await axios.get('/obavjestenje/brojNeprocitanihUkupno');
            setBrojNeprocitanih(response.data[0].brojNeprocitanih);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBrojNeprocitanih();
    },[])

    return (
        <main id="home-body">

            <div id="home-main">
                <div className="row">
                    <Link to="/calendar" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faCalendar} className="home-icons" />
                            <h2 className="home-title">Kalendar</h2>
                        </div>
                    </Link>

                    <Link to="/results" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faSquarePollVertical} className="home-icons" />
                            <h2 className="home-title">Pregled rezultata</h2>
                        </div>
                    </Link>

                    <Link to="/notifications" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faBell} className="home-icons" />
                            <h2 className="home-title">Obavještenja</h2>
                        </div>
                        {brojNeprocitanih > 0 && user.rola === 'Student' && <div id = "brojNeprocitanihUkupno">{brojNeprocitanih}</div>}

                    </Link>
                </div>

                <div className="row">
                    <Link to="/materials" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faBook} className="home-icons" />
                            <h2 className="home-title">Materijali</h2>
                        </div>
                    </Link>

                    <Link to="/grade-sheet" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faFileLines} className="home-icons"/>
                            <h2 className="home-title">Matični list</h2>
                        </div>
                    </Link>
                </div>  
            </div>

        </main>
    )
}

export default Home