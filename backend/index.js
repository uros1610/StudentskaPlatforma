const db = require('./db.js');

const express = require('express')
const http = require('http')


const app = express()
const server = http.createServer(app);

app.use(express.json());
app.use(express.static('public'))
app.use('/student',require('./routes/student'));
app.use('/profesor',require('./routes/profesor'));
app.use('/obavjestenje',require('./routes/obavjestenje'));
app.use('/auth',require('./routes/auth'));
app.use('/provjera',require('./routes/provjera'))
app.use('/polozeni',require('./routes/polozeni'))
app.use('/materijal',require('./routes/materijal'));

const getPoints = (korisnicko_ime, predmet, callback) => {
    const query = `
        SELECT ukupan_broj_poena
        FROM pohadja
        WHERE korisnickoime_studenta = ? AND ime_predmeta = ?
    `;
    db.query(query, [korisnicko_ime, predmet], (err, results) => {
      if (err) return callback(err);
      callback(null, results.map(row => row.ukupan_broj_poena));
    });
};

const getSubjects = (korisnicko_ime, callback) => {
    const query = `
        SELECT ime_predmeta
        FROM pohadja
        WHERE korisnickoime_studenta = ?
    `;
    db.query(query, [korisnicko_ime], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
};

const getProfessor = (ime, prezime, callback) => {
    const query = `
        SELECT ime_predmeta FROM profesor p INNER JOIN profesor_predmet pp
        ON p.korisnickoime = pp.korisnickoime_profesora WHERE p.ime_profesora = ? 
        AND p.prezime_profesora = ?
    `;
    db.query(query, [ime, prezime], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
}

const getMaterials = (predmet, callback) => {
    const query = `
        SELECT naslov FROM materijal WHERE ime_predmeta = ?
    `;
    db.query(query, [predmet], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });  
};

app.post('/chat/:korisnickoIme', async (req, res) => {
    const { prompt } = req.body;
    const korisnicko_ime = req.params.korisnickoIme;
    console.log(korisnicko_ime);
  
    if (prompt.toLowerCase() === "zdravo!") {
      return res.json({ reply: "Zdravo. Kako Vam mogu pomoći?" });
    } else if (prompt.toLowerCase().includes("koliko bodova imam iz predmeta")) {
  
      const regex = /koliko bodova imam iz predmeta (.+)\?/i; 
      const match = prompt.match(regex);
      
      if (match) {
        const predmet = match[1].trim();
  
        getPoints(korisnicko_ime, predmet, (err, slots) => {
          console.log(prompt.toLowerCase()); 
          if (err) return res.status(500).send('Greška prilikom dohvatanja bodova.');
          if (slots.length > 0) {
            res.json({ reply: `Vaš broj bodova iz predmeta ${predmet} je: ${slots.join(', ')}.` });
          } else {
            res.json({ reply: `Nemate bodove iz tog predmeta.` });
          }
        });
      } else {
        res.status(400).send('Pogrešan format pitanja.');
      }
    } else if (prompt.toLowerCase().includes("koje predmete pohađam")) {
      const regex = /koje predmete pohađam\?/i; 
      const match = prompt.match(regex);
  
      if (match) {  
        getSubjects(korisnicko_ime, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Greška prilikom pretraživanja podataka.' });
          }
          res.status(200).json({ reply: `Vaši predmeti su: ${result.map(row => row.ime_predmeta).join(', ')}.` });
        });
      } else {
        res.status(400).send('Pogrešan format pitanja.');
      }
    } else if (prompt.toLowerCase().includes("svi predmeti koje predaje profesor")) {
      const regex = /svi predmeti koje predaje profesor (.+)\?/i; 
      const match = prompt.match(regex);
  
      if (match) {
        const profesor = match[1].trim();
        const [ime, prezime] = profesor.split(' ');

        getProfessor(ime, prezime, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Greška prilikom pretraživanja podataka.' });
          }
          res.status(200).json({ reply: `Profesor ${profesor} predaje predmete: ${result.map(row => row.ime_predmeta).join(', ')}.` });
        });
      } else {
        res.status(400).send('Pogrešan format pitanja.');
      }
    } else if (prompt.toLowerCase().includes("koji su dostupni materijali za predmet")) {
        const regex = /koji su dostupni materijali za predmet (.+)\?/i; 
        const match = prompt.match(regex);
    
        if (match) {
            const predmet = match[1].trim();
    
            getMaterials(predmet, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Greška prilikom pretraživanja podataka.' });
            }
            res.status(200).json({ reply: `Dostupni materijali za predmet ${predmet} su: ${result.map(row => row.naslov).join(', ')}.` });
            });
        } else {
            res.status(400).send('Pogrešan format pitanja.');
        }
    }
    else {
      res.json({ reply: "Ne mogu da odgovorim na Vaše pitanje." });
    }
  });

server.listen(8000,() => {
    console.log("Connected!");
})