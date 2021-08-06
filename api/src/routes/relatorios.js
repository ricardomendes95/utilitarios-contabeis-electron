var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET Empresas listing. */
router.get("/", async function (req, res, next) {
  res.json({ name: "estamos no relatorios" });
});
router.post("/responsibilityLetter", async function (req, res, next) {
  console.log(req.body);
  var lastUpdateDate = new Date();
  if (req.body.registrationData === "inicial") {
    lastUpdateDate = req.body.startDate;
  } else {
    lastUpdateDate = req.body.endDate;
  }

  const crc = req.body.crc === "Do contador" ? 1 : 2;

  const data = await axios.get(
    "http://localhost:8080/responsabilityLetter?lastUpdateDate=" +
      lastUpdateDate +
      "&crcType=" +
      crc
  );

  res.json(data.data);
});

router.get("/companyResponsibilityLetter/:id", async function (req, res, next) {
  try {
    const data = await axios.get(
      "http://localhost:8080/responsabilityLetter/company?id=" + req.params.id
    );

    return res.json(data.data);
  } catch (error) {
    return res.status(500).send("error");
  }
});

module.exports = router;
