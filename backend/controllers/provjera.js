const db = require('../db')

const sveProvjereDatumi = (req,res) => {

    const {imePredmeta,imeSmjera,imeFakulteta} = req.params;
    const query = "SELECT DISTINCT ime_predmeta,ime_smjera,ime_fakulteta,datum_odrzavanja,ime_provjere FROM Rezultat WHERE ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?"

    db.query(query,[imePredmeta,imeSmjera,imeFakulteta],(err,data) => {

        if(err) {
            return res.status(500).json("Internal server error!");
        }
        else {
            return res.status(200).json(data);
        }
    })
}

module.exports = {sveProvjereDatumi}