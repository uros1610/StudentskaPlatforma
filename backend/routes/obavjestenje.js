const express = require('express');
const router = express.Router();

const {svaObavjestenjaPredmet,insertObavjestenje,updateObavjestenje,jednoObavjestenje, deleteObavjestenje,brojNeprocitanih,svaNeprocitanaObavjestenjaPredmet, deleteNeprocitanoObavjestenje,brojNeprocitanihUkupno} = require('../controllers/obavjestenje')

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',svaObavjestenjaPredmet);
router.get('/brojNeprocitanih/:imePredmeta/:imeSmjera/:imeFakulteta',brojNeprocitanih);
router.get('/brojNeprocitanihUkupno/',brojNeprocitanihUkupno);
router.get('/neprocitanaObavjestenja/:imePredmeta/:imeSmjera/:imeFakulteta',svaNeprocitanaObavjestenjaPredmet);
router.post('/:imePredmeta/:imeSmjera/:imeFakulteta',insertObavjestenje);
router.put('/:idObavjestenja',updateObavjestenje);
router.get('/:idObavjestenja',jednoObavjestenje);
router.delete('/:idObavjestenja',deleteObavjestenje);
router.delete('/neprocitano/:idObavjestenja',deleteNeprocitanoObavjestenje);


module.exports = router;