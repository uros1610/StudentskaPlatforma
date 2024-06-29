const db = require('../db.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.sviMaterijaliProfesora = (req, res) => {
    // vrace imena fajlova, kako bi mogli da se displajuju
    // '/public/ime_fajla.ekstenzija'
    const query = `SELECT id, putanja FROM materijal WHERE korisnickoime_profesora = ?`;

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

        if(err) {
            return res.status(403).json("Forbidden!");
        }

        //vrace sva imena fajlova vezanih za ovoga profesora
        db.query(query, [data.korisnickoIme], (err,results) => {
            if (err) {
                return res.status(500).json("Internal server error!");
            }
            
            let imena_materijala = [];
            
            results.data.forEach(materijal => {
                let ime_materijala = { id:materijal.id, putanja:materijal.putanja.split("/")[2] };
                imena_materijala.push(ime_materijala);
            });

            res.status(200).json(imena_materijala);
        });

    })

};

exports.sviMaterijaliPredmet = (req, res) => {
    
    const ime_predmeta = req.params.imePredmeta;
    const ime_smjera = req.params.imeSmjera;
    const ime_fakulteta = req.params.imeFakulteta;

    const query = `SELECT putanja FROM materijal WHERE ime_predmeta = ? AND ime_smjera = ? AND ime_fakulteta = ?`;

    db.query(query, [ime_predmeta, ime_smjera, ime_fakulteta], (err,results) => {
        if (err) {
            return res.status(500).json("Internal server error!");
        }
        
        let imena_materijala = [];

        results.data.forEach(materijal => {
            let ime_materijala = { id:materijal.id, putanja:materijal.putanja.split("/")[2] };
            imena_materijala.push(ime_materijala);
        });

        res.status(200).json(imena_materijala);
    });
}

//ovi su samo za vracanje imena fajlova, slijedi za download ->

//pretpostavljam da na klik ide da se ovo poziva
exports.downloadMaterial = (req, res) => {
    const {ime} = req.body;
    
    const filePath = `../public/${ime}`;

    res.download(filePath, ime, (err) => {
      if (err) {
        console.error('File download error:', err);
        res.status(404).json({ message: 'File not found', err: err });
      } else {
        res.status(200).json({message:'File download successful'});
      }
    });
}

exports.okaciMaterijal = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No materials were attatched' });
    }

    const {ime_predmeta} = req.body;
    const {ime_smjera} = req.body;
    const {ime_fakulteta} = req.body;
    const {ime_materijala} = req.body;

    const attached_file = req.files.file;

    const putanja = '../public/'+ime_materijala;
    const query = `INSERT INTO materijali (korisnickoime_profesora, ime_predmeta, ime smjera, ime_fakulteta, putanja, naslov) VALUES (?,?,?,?,?,?)`;

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

        if(err) {
            return res.status(403).json("Forbidden!");
        }

        db.query(query,[data.korisnickoIme, ime_predmeta, ime_smjera, ime_fakulteta, putanja, ime_materijala], (err,results) => {
            if (err) {
                return res.status(500).json("Internal server error!");
            }
            
            attached_file.mv(putanja, (err) => {
                if (err) {
                  return res.status(500).json({ error: 'File upload failed', err: err });
                }
            
                res.status(200).json({
                    message: 'File uploaded successfully',
                    file: {
                    name: attached_file.name,
                    mimetype: attached_file.mimetype,
                    size: attached_file.size
                }});
              });
        });
        
    });

}

exports.obrisiMaterijal = (req, res) => {
    const id = req.params.id;
    const ime_fajla = req.params.imeMaterijala;

    const query = `DELETE FROM materijal WHERE id = ?`;
    const filePath = '../public/'+ime_fajla;

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,data) => {

        if(err) {
            return res.status(403).json("Forbidden!");
        }
        
        db.query(query,[id], (err,results) => {
            if (err) {
                return res.status(500).json("Internal server error!");
            }

            if(results.affectedRows === 0){
                return res.status(404).json("Material not found");
            }
            
            fs.unlink(filePath, (err) => {
                if (err) {
                  return res.status(500).json({ error: 'Failed to delete material', details: err });
                }
            });

            res.status(200).json({message:'Successfully deleted material'});
        });
    });
}