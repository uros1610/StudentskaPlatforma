import React, { useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import "../styles/profile.css";
import axios from "axios";
import moment from "moment";
import AuthContext from "../context/AuthContext";

const ProfileAdmin = () => {
    const [data, setData] = useState({});
    const { user } = useContext(AuthContext);

    const fetchData = async () => {
        try {
            if (user.rola === 'Admin') {
                const response = await axios.get('/admin/sveInformacijeAdmin');
                setData(response.data[0]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id="profile-container">
            <div id="profile-title">
                <FaUser className="userIcon" id="profile-icn" />
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
                    <tr>
                        <th>Korisničko ime</th>
                        <td>{data?.korisnickoIme}</td>
                    </tr>
                    <tr>
                        <th>Spisak predmeta</th>
                        <td>
                            <ul>
                                {data.predmeti && data.predmeti.map(predmet => (
                                    <li key={predmet.id}>{predmet.naziv}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProfileAdmin;
