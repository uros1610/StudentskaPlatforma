import React from "react"
import { FaUser } from "react-icons/fa"
import "../styles/profile.css"

const Profile = () => {
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
                <td>Tijana</td>
            </tr>
            <tr>
                <th>Prezime</th>
                <td>Rakocevic</td>
            </tr>
            <tr>
                <th>Datum rođenja</th>
                <td>22.02.2002.</td>
            </tr>
            <tr>
                <th>Broj indeksa</th>
                <td>7</td>
            </tr>
            <tr>
                <th>Korisničko ime</th>
                <td>tiks</td>
            </tr>
            <tr>
                <th>Fakultet</th>
                <td>Prirodno matematicki</td>
            </tr>
            <tr>
                <th>Smjer</th>
                <td>Racunarske nauke</td>
            </tr>
        </tbody>
    </table>
        </div>
    )
}

export default Profile