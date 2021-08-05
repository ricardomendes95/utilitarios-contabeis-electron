var { Request, Response } = require("express");

module.exports = {
  async index(request, response) {
    // const orphanages = await orphanagesRepository.find();
    console.log("chegou aqui");
    return response.json({ name: "iniciei e esse e o relatorio" });
  },
};
