const XLSX2JSON = require('xlsx-json-js');
const path = require('path');
const { dominioApi } = require('../utils/axios');
const reportService = require('../services/reportService');

const xlsx2json = new XLSX2JSON();

module.exports = {
  // eslint-disable-next-line consistent-return
  getData(request, response) {
    try {
      // const { directory } = request.params;

      // const xlsxPath = path.join('./extrato.xlsx');
      console.log(path.join(__dirname, './../assets/extrato.xlsx'));
      const d = path.join(__dirname, './../assets/extrato.xlsx');
      // filepath or buffer
      const customData = xlsx2json.parse(d);
      const lista = [];
      customData[0].data.forEach((mov) => {
        if (mov[0] !== 'Movimentação') {
          const obj = {
            Movimentacao: mov[0],
            Tipo: mov[1],
            Valor: mov[2],
            SaldoAntes: mov[3],
            SaldoDepois: mov[4],
            Tarifa: mov[5],
            Data: mov[6],
            Situacao: mov[7],
            Destino: mov[8],
            DestinoDocumento: mov[9],
            DestinoInstituicao: mov[10],
            DestinoAgencia: mov[11],
            DestinoConta: mov[12],
            Origem: mov[13],
            OrigemDocumento: mov[14],
            OrigemInstituicao: mov[15],
            OrigemAgencia: mov[16],
            OrigemConta: mov[17],
          };
          lista.push(obj);
        }
      });

      response.json(lista);
    } catch (error) {
      console.log(error);
      return response.status(500).send(error);
    }
  },

  getTeste(request, response) {
    const value = request.params;
    response.send(value);
  },
};

// D:/Desktop/PROJETOS/Relatorios/Dominio/utilitarios/arquivos/builds/stone.xlsx
