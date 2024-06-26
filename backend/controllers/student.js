const db = require('../db');
const jwt = require('jsonwebtoken')


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
    const query = "SELECT * FROM Rezultat WHERE korisnickoime_studenta = ?"

    const token = req.headers.authorization.split(":")[1];


    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

    if(err) {
        return res.status(403).json("Forbidden!");
    }
    

    db.query(query,[data.korisnickoIme],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
})}

const sviRezultatiStudentaJedanPredmet = (req,res) => {
    const query = "SELECT * FROM Rezultat WHERE korisnickoime_studenta = ? AND ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?"
    
    const {korisnickoIme,imePredmeta,imeSmjera,imeFakulteta} = req.params;

    db.query(query,[korisnickoIme,imePredmeta,imeSmjera,imeFakulteta],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(data);
    })
}
const sviPredmetiStudenta = (req,res) => {
    const query = "SELECT ime_predmeta AS imePredmeta, ime_smjera AS imeSmjera,ime_fakulteta AS imeFakulteta FROM Pohadja WHERE korisnickoime_studenta = ?"

    const token = req.headers.authorization.split(" ")[1];



    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

    if(err) {
        return res.status(403).json("Forbidden!");
    }
    

    db.query(query,[data.korisnickoIme],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }

        console.log(data);

        return res.status(200).json(data);
    })
})}
    

const sviStudentiPredmet = (req,res) => {
    const query = "SELECT s.korisnickoime AS korisnickoIme, s.indeks_studenta AS indeks,s.ime_studenta AS imeStudenta,s.prezime_studenta AS prezimeStudenta FROM Pohadja p INNER JOIN Student s ON s.korisnickoime = p.korisnickoime_studenta WHERE ime_predmeta = ? AND p.ime_smjera = ? AND s.ime_fakulteta = ? "


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

const updateRezultat = (req,res) => {

    const query = "UPDATE Rezultat SET broj_poena = ? WHERE korisnickoime_studenta = ? AND id_provjere = ? AND ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?";

    const {korisnickoIme,idProvjere,imePredmeta,imeSmjera,imeFakulteta} = req.params;

    const brojPoena = req.body.brojPoena;


    db.query(query,[brojPoena,korisnickoIme,idProvjere,imePredmeta,imeSmjera,imeFakulteta],(err,data) => {

        if(err) {
            return res.status(500).json(err);
        }


        if(data.affectedRows === 0) {
            return res.status(404).json("Not found");
        }

        return res.status(200).json("Success");
    })

}


module.exports = {sviStudenti,sviStudentiJedanSmjer,sviPredmetiStudenta,sviRezultatiStudenta,sviStudentiPredmet,updateRezultat,sviRezultatiStudentaJedanPredmet}

