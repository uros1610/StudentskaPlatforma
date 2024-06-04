const express = require('express');
const router = express.Router();

const {sviStudenti,sviStudentiJedanSmjer,sviRezultatiStudenta,sviPredmetiStudenta,sviStudentiPredmet, updateRezultat} = require('../controllers/student');

router.get('/',sviStudenti);

router.get('/:imeSmjera/:imeFakulteta',sviStudentiJedanSmjer)

router.get('/sviRezultati/:indeks/:imeSmjera/:imeFakulteta',sviRezultatiStudenta);

router.get('/sviPredmeti/:indeks/:imeSmjera/:imeFakulteta',sviPredmetiStudenta);

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',sviStudentiPredmet);

router.put("/:indeks/:idProvjere/:imePredmeta/:imeSmjera/:imeFakulteta",updateRezultat);


module.exports = router;