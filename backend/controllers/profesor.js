const db = require('../db');
const jwt = require('jsonwebtoken')


const sviPredmetiProfesor = (req,res) => {
    const query = "SELECT ime_predmeta, ime_smjera, ime_fakulteta FROM profesor_predmet WHERE korisnickoime_profesora = ?"


   const token = req.headers.authorization.split(" ")[1];

   console.log(req.headers);

   console.log(token);


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




module.exports = {sviPredmetiProfesor}