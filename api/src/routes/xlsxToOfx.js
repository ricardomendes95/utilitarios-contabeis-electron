const router = require('express').Router();

const xlsxToOfx = require('../controllers/xlsxToOfxController');

router.get('/data/:directory', xlsxToOfx.getData);
router.get('/getTest/:t', xlsxToOfx.getTeste);

module.exports = router;
