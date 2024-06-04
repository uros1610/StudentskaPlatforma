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
    const query = "SELECT * FROM Rezultat  WHERE indeks = ? AND ime_smjera = ?"
    
    const {indeks,imeSmjera} = req.params;

    db.query(query,[indeks,imeSmjera],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}

const sviPredmetiStudenta = (req,res) => {
    const query = "SELECT * FROM Rezultat  WHERE indeks = ? AND ime_smjera = ?"
    
    const {indeks,imeSmjera} = req.params;

    db.query(query,[indeks,imeSmjera],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}


module.exports = {sviStudenti,sviStudentiJedanSmjer,sviPredmetiStudenta,sviRezultatiStudenta}

