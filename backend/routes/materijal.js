const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

const materijaliController = require('../controllers/materijal.js');

router.use(fileUpload({createParentPath: true}));
router.get('/MaterijaliProfesora', materijaliController.sviMaterijaliProfesora);
router.get('/MaterijaliPredmeta', materijaliController.sviMaterijaliPredmet);
router.get('/PreuzmiMaterijal', materijaliController.downloadMaterial);
router.post('/PostaviMaterijal', materijaliController.okaciMaterijal);
router.delete('/ObrisiMaterijal/:id', materijaliController.obrisiMaterijal);

module.exports = router;