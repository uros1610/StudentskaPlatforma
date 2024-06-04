const db = require('../db');


const sviStudenti = (req,res) => {
    const query = "SELECT * FROM Student"

    db.query(query,[],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }
        return res.status(200).json(data);
    })
}

const sviStudentiJedanSmjer = (req,res) => {
    const query = "SELECT * FROM Student WHERE ime_fakulteta = ? AND ime_smjera = ?"
    

    const {imeFakulteta,imeSmjera} = req.params;

    

    db.query(query,[imeFakulteta,imeSmjera],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    })
}

const sviRezultatiStudenta = (req,res) => {
    const query = "SELECT * FROM Rezultat  WHERE indeks_studenta = ? AND ime_smjera = ? AND ime_fakulteta = ?"
    
    const {indeks,imeSmjera,imeFakulteta} = req.params;

    db.query(query,[indeks,imeSmjera,imeFakulteta],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}

const sviPredmetiStudenta = (req,res) => {
    const query = "SELECT * FROM Pohadja  WHERE indeks = ? AND ime_smjera = ? AND ime_fakulteta = ?"
    
    const {indeks,imeSmjera,imeFakulteta} = req.params;

    db.query(query,[indeks,imeSmjera,imeFakulteta],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}

const sviStudentiPredmet = (req,res) => {
    const query = "SELECT s.indeks_studenta,s.ime_studenta,s.prezime_studenta FROM Pohadja p INNER JOIN Student s ON s.indeks_studenta = p.indeks_studenta WHERE ime_predmeta = ? AND p.ime_smjera = ? AND s.ime_fakulteta = ? "


    const imePredmeta = req.params.imePredmeta;
    const imeSmjera = req.params.imeSmjera;
    const imeFakulteta = req.params.imeFakulteta;

    console.log(req.params);

    db.query(query,[imePredmeta,imeSmjera,imeFakulteta],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}


module.exports = {sviStudenti,sviStudentiJedanSmjer,sviPredmetiStudenta,sviRezultatiStudenta,sviStudentiPredmet}

