const express = require("express");
const cors = require("cors");
const relatoriosRouter = require("./routes/relatorios");

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.get("/", (req, res) => {
  return res.json("pegou praga");
});
app.use("/relatorios", relatoriosRouter);

app.listen(3001, () => console.log("app rodando na porta 3001"));
// console.log("app rodando na porta 3001");
