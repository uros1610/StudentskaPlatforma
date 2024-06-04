const db = require('../db');


const sviPredmetiProfesor = (req,res) => {
    const query = "SELECT ime_predmeta, ime_smjera, ime_fakulteta FROM ProfesorPredmet WHERE id_profesora = ?"

    const id = req.params.id;

    db.query(query,[id],(err,data) => {
        if(err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    })
}



module.exports = {sviPredmetiProfesor}