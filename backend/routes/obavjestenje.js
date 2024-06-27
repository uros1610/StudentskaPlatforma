const express = require('express');
const router = express.Router();

const {svaObavjestenjaPredmet,insertObavjestenje,updateObavjestenje,jednoObavjestenje, deleteObavjestenje,brojNeprocitanih} = require('../controllers/obavjestenje')

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',svaObavjestenjaPredmet);
router.get('/brojNeprocitanih/:imePredmeta/:imeSmjera/:imeFakulteta',brojNeprocitanih);
router.post('/:imePredmeta/:imeSmjera/:imeFakulteta',insertObavjestenje);
router.put('/:idObavjestenja',updateObavjestenje);
router.get('/:idObavjestenja',jednoObavjestenje);
router.delete('/:idObavjestenja',deleteObavjestenje);


module.exports = router;