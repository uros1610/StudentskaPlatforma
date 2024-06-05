const db = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

require('dotenv').config()

const login = (req,res) => {

    const {korisnickoIme,lozinka} = req.body;

    const queryStudent = "SELECT * From Student WHERE korisnickoIme = ?"
    const queryProfesor = "SELECT * FROM Profesor where korisnickoIme = ?"

    db.query(queryStudent,[korisnickoIme],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }

        if(data.length) {
        const correctPassword = bcrypt.compareSync(Lozinka,data[0].lozinka);

            if(correctPassword) {
                const token = jwt.sign({korisnickoime:data[0].korisnickoime,indeks_studenta:data[0].indeks_studenta,ime_smjera:data[0].ime_smjera,ime_fakulteta:data[0].ime_fakulteta},process.env.SECRET_KEY);

                const sendObj = {korisnickoime:data[0].korisnickoime,indeks_studenta:data[0].indeks_studenta,ime_smjera:data[0].ime_smjera,ime_fakulteta:data[0].ime_fakulteta,rola:"Student",token:token};

                return res.status(200).json(sendObj);
            }
        }
        

        db.query(queryProfesor,[korisnickoIme],(err,data) => {
            if(!data.length) {
                return res.status(401).json("Nepravilno korisnicko ime!");
            }
            else {
                const correctPassword = bcrypt.compareSync(lozinka,data[0].lozinka)

                if(!correctPassword) {
                    return res.status(401).json("Nepravilna lozinka!");
                }

            const token = jwt.sign({korisnickoime:data[0].korisnickoime_studenta},process.env.SECRET_KEY);

            const sendObj = {korisnickoime:data[0].korisnickoime_studenta,rola:"Profesor",token:token};

            return res.status(200).json(sendObj);
            }
        })

    })

    

}

const logout = (req,res) => {

}


module.exports = {login,logout}