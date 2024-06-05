const db = require('../db');


const sviPredmetiProfesor = (req,res) => {
    const query = "SELECT ime_predmeta, ime_smjera, ime_fakulteta FROM profesor_predmet WHERE korisnickoime_profesora = ?"

    const korisnickoIme = req.params.korisnickoIme;

    db.query(query,[korisnickoIme],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    })
}



module.exports = {sviPredmetiProfesor}