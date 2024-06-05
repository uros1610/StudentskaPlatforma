const express = require('express');
const router = express.Router();

const {svaObavjestenjaPredmet,insertObavjestenje,updateObavjestenje} = require('../controllers/obavjestenje')

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',svaObavjestenjaPredmet);

router.post('/:korisnickoIme/:imePredmeta/:imeSmjera/:imeFakulteta',insertObavjestenje);

router.put('/:idObavjestenja',updateObavjestenje);


module.exports = router;