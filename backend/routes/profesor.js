const express = require('express');
const router = express.Router();

const {sviPredmetiProfesor,sveInfoProfesor} = require('../controllers/profesor');

router.get('/sviPredmetiProfesora',sviPredmetiProfesor);
router.get('/sveInformacijeProfesor',sveInfoProfesor)



module.exports = router;