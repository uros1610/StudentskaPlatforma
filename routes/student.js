const express = require('express');
const router = express.Router();

const {sviStudenti,sviStudentiJedanSmjer,sviRezultatiStudenta,sviPredmetiStudenta} = require('../controllers/student');

router.get('/',sviStudenti);

router.get('/:imeFakulteta/:imeSmjera',sviStudentiJedanSmjer)

router.get('/sviRezultati/:indeks/:imeSmjera',sviRezultatiStudenta);

router.get('sviPredmeti/:indeks/:imeSmjera',sviPredmetiStudenta);

module.exports = router;