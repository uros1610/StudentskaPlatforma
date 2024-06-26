const db = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

require('dotenv').config()

const login = (req,res) => {

    const {username,password} = req.body;

    const queryStudent = "SELECT * From Student WHERE korisnickoIme = ?"
    const queryProfesor = "SELECT * FROM Profesor where korisnickoIme = ?"

    db.query(queryStudent,[username],(err,data) => {
        if(err) {
            return res.status(500).json("Internal server error!");
        }

        if(data.length) {
        const correctPassword = bcrypt.compareSync(password,data[0].lozinka);

            if(correctPassword) {
                const token = jwt.sign({korisnickoIme:data[0].korisnickoime,indeksStudenta:data[0].indeks_studenta,imeSmjera:data[0].ime_smjera,imeFakulteta:data[0].ime_fakulteta},process.env.SECRET_KEY);

                const sendObj = {korisnickoIme:data[0].korisnickoime,indeksStudenta:data[0].indeks_studenta,imeSmjera:data[0].ime_smjera,imeFakulteta:data[0].ime_fakulteta,rola:"Student",token:token};

                return res.status(200).json(sendObj);
            }
        }
        

        db.query(queryProfesor,[username],(err,data) => {

            if(err) {
                return res.status(500).json("Internal server error!");
            }

            if(!data.length) {
                return res.status(401).json({message:"Nepravilno korisničko ime!"});
            }
            else {
                const correctPassword = bcrypt.compareSync(password,data[0].lozinka)

                if(!correctPassword) {
                    return res.status(401).json({message:"Nepravilna lozinka!"});
                }

            const token = jwt.sign({korisnickoIme:data[0].korisnickoime},process.env.SECRET_KEY);

            const sendObj = {korisnickoIme:data[0].korisnickoime,rola:"Profesor",token:token};

            res.status(200).json(sendObj);
            }
        })

    })

    

}

const logout = (req,res) => {

}


module.exports = {login,logout}