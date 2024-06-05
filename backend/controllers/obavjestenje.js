const db = require('../db')
const jwt = require('jsonwebtoken')

const svaObavjestenjaPredmet = (req,res) => {

    const q = "SELECT * FROM Obavjestenje WHERE ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?";

    const {imePredmeta,imeSmjera,imeFakulteta} = req.params;

    console.log("XD",req.params);

    db.query(q,[imePredmeta,imeSmjera,imeFakulteta],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        else {
            return res.status(200).json(data);
        }
    })
}

const insertObavjestenje = (req,res) => { // provjera preko tokena da li je to on
    const query = "SELECT * FROM ProfesorPredmet WHERE id_profesora = ? AND ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?"

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json("Unauthorized: Invalid token!");
        }

        const idProfesora = decoded.idProfesora;
        const { imePredmeta, imeSmjera, imeFakulteta } = req.params;

        console.log(req.body);

        const query = "SELECT * FROM ProfesorPredmet WHERE id_profesora = ? AND ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?";
        
        db.query(query, [idProfesora, imePredmeta, imeSmjera, imeFakulteta], (err, data) => {
            if (err) {
                return res.status(500).json("Internal server error!");
            }
            if (!data.length) {
                return res.status(403).json("Forbidden!");
            }
            const values = [Date.now(), req.body.opis, req.body.naslov, idProfesora, imePredmeta, imeSmjera, imeFakulteta];
            const queryInsert = "INSERT INTO Obavjestenje(datum_kreiranja, opis, naslov, id_profesora, ime_predmeta, ime_smjera, ime_fakulteta) VALUES(?)";

            db.query(queryInsert, [values], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Internal server error!");
                }
                else {
                    return res.status(200).json(data);
                }
            });
        });
    });
}

const updateObavjestenje = (req,res) => {
    const q = "UPDATE Obavjestenje SET datum_kreiranja = ? , naslov = ? opis = ? WHERE id_obavjestenja = ?"

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json("Unauthorized: Invalid token!");
        }})

        const idProfesora = decoded.idProfesora;

    db.query(q,[Date.now(),req.body.naslov,req.body.opis,req.params.idObavjestenja],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }


        if(data.affectedRows === 0) {
            return res.status(404).json("Not found");
        }

        return res.status(200).json("Success");
    })
}

const deleteObavjestenje = (req,res) => {
    const q = "DELETE FROM Obavjestenje WHERE id_obavjestenja = ?";

    db.query(q,[req.params.id],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        if(data.affectedRows === 0) {
            return res.status(404).json("Not found");
        }
        return res.status(200).json("Success");
    })
}

module.exports = {svaObavjestenjaPredmet,insertObavjestenje,updateObavjestenje}