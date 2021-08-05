var express = require("express");
var router = express.Router();

/* GET Empresas listing. */
router.get("/", async function (req, res, next) {
  res.json({ name: "estamos no relatorios" });
});

module.exports = router;
