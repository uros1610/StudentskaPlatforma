import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSquarePollVertical, faBell, faBook, faFileLines } from '@fortawesome/free-solid-svg-icons'
import "../styles/home.css"

const Home = () => {
    return (
        <main id="home-body">

            <div id="home-main">
                <div className="row">
                <div className="home-card">
                    <FontAwesomeIcon icon={faCalendar} className="home-icons" />
                    <h2 className="home-title">Kalendar</h2>
                </div>

                <div className="home-card">
                    <FontAwesomeIcon icon={faSquarePollVertical} className="home-icons" />
                    <h2 className="home-title">Pregled rezultata</h2>
                </div>

                <div className="home-card">
                    <FontAwesomeIcon icon={faBell} className="home-icons" />
                    <h2 className="home-title">Obavještenja</h2>
                </div>
                </div>

                <div className="row">
                <div className="home-card">
                    <FontAwesomeIcon icon={faBook} className="home-icons" />
                    <h2 className="home-title">Matrijali</h2>
                </div>

                <div className="home-card">
                    <FontAwesomeIcon icon={faFileLines} className="home-icons" />
                    <h2 className="home-title">Matični list</h2>
                </div>
                </div>  
            </div>

        </main>
    )
}

export default Home