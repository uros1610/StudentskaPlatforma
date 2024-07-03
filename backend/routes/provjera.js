const express = require('express')

const router = express.Router()

const {sveProvjereDatumi, insertProvjera, imenaProvjera} = require('../controllers/provjera')

router.get('/:imePredmeta/:imeSmjera/:imeFakulteta',sveProvjereDatumi);
router.post('/:imePredmeta/:imeSmjera/:imeFakulteta',insertProvjera)
router.get('/imenaProvjera',imenaProvjera)


module.exports = router;