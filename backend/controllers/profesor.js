const db = require('../db');
const jwt = require('jsonwebtoken')


const sviPredmetiProfesor = (req,res) => {
    const query = "SELECT ime_predmeta AS imePredmeta, ime_smjera AS imeSmjera, ime_fakulteta AS imeFakulteta FROM profesor_predmet WHERE korisnickoime_profesora = ?"

   

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
        console.log("sdKDSFJFSDJFSDGJDSFGJSDGFJGFSD");
        console.log(data);
        return res.status(200).json(data);
    })
})}


const sveInfoProfesor = (req, res) => {
    const query = `
        SELECT 
            ime_profesora AS ime,
            prezime_profesora AS prezime,
            datum_rodjenja_profesora AS datumRodjenja,
            korisnickoime AS korisnickoIme 
        FROM Profesor
        WHERE korisnickoime = ?`;

    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json("Forbidden! No token provided.");
    }

    const token = authHeader.split(" ")[1];

  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json("Forbidden! Invalid token.");
        }

        
        const korisnickoIme = decoded.korisnickoIme;
        
        
        db.query(query, [korisnickoIme], (err, results) => {
            if (err) {
                return res.status(500).json("Internal Server Error: " + err.message);
            }

           
            if (results.length === 0) {
                return res.status(404).json("Profesor not found");
            }

            
            return res.status(200).json(results);
        });
    });
};





module.exports = {sviPredmetiProfesor,sveInfoProfesor}