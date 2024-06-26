const express = require('express');
const router = express.Router();

const {sviPredmetiProfesor} = require('../controllers/profesor');

router.get('/sviPredmetiProfesora',sviPredmetiProfesor);


module.exports = router;