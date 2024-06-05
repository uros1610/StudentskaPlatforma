const express = require('express');
const router = express.Router();

const {sviStudenti,sviStudentiJedanSmjer,sviRezultatiStudenta,sviPredmetiStudenta,sviStudentiPredmet, updateRezultat} = require('../controllers/student');

router.get('/',sviStudenti);

router.get('/sviRezultati/:korisnickoIme',sviRezultatiStudenta);
router.get('/sviRezultati/:korisnickoIme/:imePredmeta/:imeSmjera/:imeFakulteta',sviRezultatiStudenta);
router.get('/sviRezultati/:korisnickoIme/:imePredmeta/:imeSmjera/:imeFakulteta',sviRezultatiStudenta);


router.get('/:imeSmjera/:imeFakulteta',sviStudentiJedanSmjer)
router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',sviStudentiPredmet);
router.put("/:korisnickoIme/:idProvjere/:imePredmeta/:imeSmjera/:imeFakulteta",updateRezultat);


module.exports = router;