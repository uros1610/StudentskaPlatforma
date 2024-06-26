const express = require('express');
const router = express.Router();

const {svaObavjestenjaPredmet,insertObavjestenje,updateObavjestenje,jednoObavjestenje, deleteObavjestenje} = require('../controllers/obavjestenje')

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',svaObavjestenjaPredmet);

router.post('/:imePredmeta/:imeSmjera/:imeFakulteta',insertObavjestenje);

router.put('/:idObavjestenja',updateObavjestenje);
router.get('/:idObavjestenja',jednoObavjestenje);
router.delete('/:idObavjestenja',deleteObavjestenje);


module.exports = router;