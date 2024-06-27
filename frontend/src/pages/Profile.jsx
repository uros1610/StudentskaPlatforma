import React, { useContext } from "react"
import { FaUser } from "react-icons/fa"
import "../styles/profile.css"
import axios from "axios"
import { useState,useEffect} from "react"
import moment from "moment"
import AuthContext from "../context/AuthContext"
import PredmetContext from "../context/PredmetContext"

const Profile = () => {

    const [data,setData] = useState({});
    const {user} = useContext(AuthContext)
    const {predmeti} = useContext(PredmetContext)

    const fetchData = async () => {

        try {
            if(user.rola === 'Student') {
                const response = await axios.get('/student/sveInformacijeStudent');
                console.log(response);
                setData(response.data[0]);

            }

            if(user.rola === 'Profesor') {
                const response = await axios.get('/profesor/sveInformacijeProfesor');
                console.log(response);
                setData(response.data[0]);
            }
           
        }
        catch(err) {

        }

    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <div id="profile-container">
            <div id="profile-title">
                <FaUser className = "userIcon" id="profile-icn"/>
                <h1>Lični podaci</h1>
            </div>

            <table id="profile-table">
        <tbody>
            <tr>
                <th>Ime</th>
                <td>{data?.ime}</td>
            </tr>
            <tr>
                <th>Prezime</th>
                <td>{data?.prezime}</td>
            </tr>
            <tr>
                <th>Datum rođenja</th>
                <td>{data && moment(new Date(data.datumRodjenja)).format('DD.MM.YYYY')}</td>
            </tr>
            {
                data?.indeks && data.indeks &&
                <tr>
                    <th>Broj indeksa</th>
                    <td>{data?.indeks}</td>
                </tr>
            }

            <tr>
                <th>Korisničko ime</th>
                <td>{data?.korisnickoIme}</td>
            </tr>

            <tr>
                <th>Fakultet</th>
                <td>{data?.imeFakulteta}</td>
            </tr>
            <tr>
                <th>Smjer</th>
                <td>{data?.imeSmjera}</td>
            </tr>
        </tbody>
    </table>
        </div>
    )
}

export default Profile