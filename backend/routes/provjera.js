const express = require('express')

const router = express.Router()

const {sveProvjereDatumi} = require('../controllers/provjera')

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',sveProvjereDatumi);


module.exports = router;