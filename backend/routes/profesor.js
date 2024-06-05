const express = require('express');
const router = express.Router();

const {sviPredmetiProfesor} = require('../controllers/profesor');

router.get('/sviPredmeti/:id',sviPredmetiProfesor);


module.exports = router;