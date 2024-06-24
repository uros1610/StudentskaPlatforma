const express = require('express');
const router = express.Router();

const {sviStudenti,sviStudentiJedanSmjer,sviRezultatiStudenta,sviPredmetiStudenta,sviStudentiPredmet, updateRezultat} = require('../controllers/student');

router.get('/',sviStudenti);

router.get('/sviRezultati',sviRezultatiStudenta);
router.get('/sviPredmetiStudenta',sviPredmetiStudenta);
router.get('/:imeSmjera/:imeFakulteta',sviStudentiJedanSmjer)
router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',sviStudentiPredmet);
router.put(":idProvjere/:imePredmeta/:imeSmjera/:imeFakulteta",updateRezultat);



module.exports = router;