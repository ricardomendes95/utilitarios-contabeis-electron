var express = require("express");
const axios = require("axios");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");
var router = express.Router();
const { getLocation } = require("../utils/getLocation.js");

let saveLocation = "";
let office = {};
let offices = [];
let mainOffice = {};

/* GET Empresas listing. */
router.get("/pdf", async (req, res) => {
  for (let index = 0; index < offices.length; index++) {
    office = { ...mainOffice, ...offices[index] };
    console.log(office.razaoCliente);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3001/reports/", {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      path: path.join(saveLocation, office.razaoCliente + ".pdf"),
      printBackground: true,
      format: "letter",
    });

    await browser.close();
    if (index === offices.length) {
      saveLocation = "";
      office = {};
      offices = [];
      mainOffice = {};
    }
  }
  return res.send("feito");
});

router.get("/", async function (req, res, next) {
  const filePath = path.join(
    __dirname,
    "../",
    "views",
    "responsabilityLetter",
    "ResponsabilityLetter.ejs"
  );

  ejs.renderFile(filePath, { office }, (err, data) => {
    if (err) {
      return res.send("erro na leitura do arquivo");
    }

    res.send(data);

    // res.json({ name: "estamos no relatorios" });
  });
});

router.post("/responsibilityLetter", async function (req, res, next) {
  const result = await axios.get(
    "http://localhost:3001/config/ipDominioServer"
  );
  const apiDominio = result.data;

  if (!apiDominio) {
    res.json({ error: "ip do servidor Dominio não configurado" });
  }

  var lastUpdateDate = new Date();
  if (req.body.registrationData === "inicial") {
    lastUpdateDate = req.body.startDate;
  } else {
    lastUpdateDate = req.body.endDate;
  }

  const crc = req.body.crc === "Do contador" ? 1 : 2;

  const data = await axios.get(
    "http://" +
      apiDominio +
      ":8080/responsabilityLetter?lastUpdateDate=" +
      lastUpdateDate +
      "&crcType=" +
      crc
  );
  saveLocation = req.body.saveLocation[0];
  offices = data.data;
  mainOffice = req.body;

  axios.get("http://localhost:3001/reports/pdf");

  res.json(data.data);
});

router.get("/companyResponsibilityLetter/:id", async function (req, res, next) {
  const result = await axios.get(
    "http://localhost:3001/config/ipDominioServer"
  );
  const apiDominio = result.data;

  if (!apiDominio) {
    res.json({ error: "ip do servidor Dominio não configurado" });
  }

  try {
    const data = await axios.get(
      "http://" +
        apiDominio +
        ":8080/responsabilityLetter/company?id=" +
        req.params.id
    );

    return res.json(data.data);
  } catch (error) {
    return res.status(500).send("error");
  }
});

router.get("/local", async function (req, res, next) {
  res.send(getLocation());
});

module.exports = router;
