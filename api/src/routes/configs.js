const { response } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const directory = path.join(__dirname, "../", "utils", "configServer.json");
let config = {};

router.post("/ipDominioServer", (request, response) => {
  config = { ...request.body };

  fs.readFile(directory, "utf8", function readFileCallback(err, data) {
    if (err) {
      response.json(err);
    } else {
      config = JSON.parse(data);
      config.ipDominio = request.body.ipServer;
      json = JSON.stringify(config);
      fs.writeFile(directory, json, "utf8", function (err) {
        if (err) {
          response.json(err);
        }
        response.json(request.body);
      });
    }
  });
});

router.get("/ipDominioServer", (resquest, response) => {
  fs.readFile(directory, "utf8", function readFileCallback(err, data) {
    if (err) {
      response.json(err);
    }
    config = JSON.parse(data); //now it an object
    response.json(config.ipDominio);
  });
});

module.exports = router;
