import React, { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faSquarePollVertical, faBell, faBook, faFileLines } from '@fortawesome/free-solid-svg-icons'
import "../styles/home.css"
import { Link } from "react-router-dom"
import { useState,useEffect} from "react"
import axios from "axios"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import InsertProvjera from "../components/InsertProvjera"
import { faRobot } from '@fortawesome/free-solid-svg-icons'

const Home = () => {

    const [brojNeprocitanih,setBrojNeprocitanih] = useState();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login');
        }
    
       },[])

    const fetchBrojNeprocitanih = async () => {
        try {
            if(user) {
                const response = await axios.get('/obavjestenje/brojNeprocitanihUkupno');
                setBrojNeprocitanih(response.data[0].brojNeprocitanih);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBrojNeprocitanih();
    },[])

    const [open,setOpen] = useState();

    /*
        const [file,setFile] = useState("");

        
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }


    const attachFile = async (e) => {
        e.preventDefault();
        if (!file) {
            console.log("No file selected");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('ime_predmeta', 'Matematika 1');
            formData.append('ime_smjera', 'Elektronika');
            formData.append('ime_fakulteta', 'Fakultet za elektrotehniku');
            formData.append('ime_fajla', file.name);
            formData.append('file', file);


            const response = await axios.post('/materijal/PostaviMaterijal', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (file) {
            console.log(file.name);
        }
    }, [file]);
    ova logika ce da ide za insert materijala, radi zasad

     {user?.rola === 'Profesor' && <div id = "uploadMaterial">
                            <input type = 'file' id = "nameOfFile" onChange={(e) => {setFile(e.target.files[0])}}/>
                            <button onClick={attachFile}>Klik</button>
                        </div>}
    */

  

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

                    {user?.rola === 'Student' && 
                        <Link to="/results" className="home-links">
                            <div className="home-card">
                                <FontAwesomeIcon icon={faFileLines} className="home-icons"/>
                                <h2 className="home-title">Pregled rezultata</h2>
                            </div>
                        </Link>
                    }

                    <Link to="/notifications" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faBell} className="home-icons" />
                            <h2 className="home-title">Obavještenja</h2>
                        </div>
                        {brojNeprocitanih > 0 && user?.rola === 'Student' && <div id = "brojNeprocitanihUkupno">{brojNeprocitanih}</div>}

                    </Link>
                </div>

                <div className="row">
                    <Link to="/materials" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faBook} className="home-icons" />
                            <h2 className="home-title">Materijali</h2>
                        </div>

                       
                    </Link>

                    {user?.rola === 'Student' && 
                        <Link to="/grade-sheet" className="home-links">
                            <div className="home-card">
                                <FontAwesomeIcon icon={faFileLines} className="home-icons"/>
                                <h2 className="home-title">Položeni ispiti</h2>
                            </div>
                        </Link>
                    }

                    {user?.rola === 'Profesor' && 
                        <Link to="/admin-panel" className="home-links">
                            <div className="home-card">
                                <FontAwesomeIcon icon={faFileLines} className="home-icons"/>
                                <h2 className="home-title">Admin panel</h2>
                            </div>
                        </Link>
                    }

                    <Link to="/chat" className="home-links">
                        <div className="home-card">
                            <FontAwesomeIcon icon={faRobot} className="home-icons" />
                            <h2 className="home-title">Chat</h2>
                        </div>
                    </Link>
                </div>  

               
            </div>

            
        </main>
    )
}

export default Home