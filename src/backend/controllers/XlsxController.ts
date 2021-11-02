/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import path from 'path';
import Xlsx from 'xlsx-json-js';
import moment from 'moment';
import fs from 'fs';
import Definitions from '../../core/types';

export default class XlsxController {
  serialize(header: any, body: any) {
    let out = '';
    // header order could matter
    const headers = [
      'OFXHEADER',
      'DATA',
      'VERSION',
      'SECURITY',
      'ENCODING',
      'CHARSET',
      'COMPRESSION',
      'OLDFILEUID',
      'NEWFILEUID',
    ];

    headers.forEach((name) => {
      out += `${name}:${header[name]}\n`;
    });
    out += '\n';

    out += this.objToOfx({ OFX: body });
    return out;
  }

  objToOfx = (obj: any) => {
    let out = '';

    Object.keys(obj).forEach((name) => {
      const item = obj[name];
      const start = `<${name}>`;
      const end = `</${name}>`;

      if (item instanceof Object) {
        if (item instanceof Array) {
          item.forEach((it) => {
            out += `${start}\n${this.objToOfx(it)}${end}\n`;
          });
          return;
        }
        return (out += `${start}\n${this.objToOfx(item)}${end}\n`);
      }
      out += `${start + item}\n`;
    });

    return out;
  };

  // eslint-disable-next-line class-methods-use-this
  convertDate(dateString: string) {
    const date = dateString.substring(0, dateString.indexOf(' '));
    const arrdate = date.split('/');
    arrdate.reverse();
    const dateNew = arrdate.toString();
    return dateNew.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  read = async (fileDirectory: string) => {
    const xlsx = new Xlsx();
    try {
      const filepath = path.resolve(fileDirectory);

      const customData = xlsx.parse(filepath);
      const lista: Definitions['XlsxToOfx'][] = [];
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

      return lista;
    } catch (error) {
      return error;
    }
  };

  convertOfx = async (form: {
    saveDirectory: string;
    fileDirectory: string;
  }) => {
    try {
      const { saveDirectory, fileDirectory } = form;

      const filePath = path.resolve(fileDirectory);
      const directoryPath = path.resolve(saveDirectory);
      const itens = (await this.read(filePath)) as Definitions['XlsxToOfx'][];

      let agency;
      let account;
      const startDate = this.convertDate(itens[itens.length - 1].Data || '');
      const endDate = this.convertDate(itens[0].Data || '');
      let debit = 0;
      let credit = 0;

      itens.forEach((iten) => {
        if (iten.DestinoAgencia !== 'Desconhecido') {
          agency = iten.DestinoAgencia;
          account = iten.DestinoConta;
        }
      });

      const header = {
        OFXHEADER: '100',
        DATA: 'OFXSGML',
        VERSION: '102',
        SECURITY: 'NONE',
        ENCODING: 'USASCII',
        CHARSET: '1252',
        COMPRESSION: 'NONE',
        OLDFILEUID: 'NONE',
        NEWFILEUID: 'NONE',
      };

      const body: any = {
        SIGNONMSGSRSV1: {
          SONRS: {
            STATUS: {
              CODE: '0',
              SEVERITY: 'INFO',
            },
            DTSERVER: moment().format('YYYYMMDD'),
            LANGUAGE: 'POR',
            FI: {
              ORG: 'Stone Pagamentos S.A',
              FID: '197',
            },
          },
        },
        BANKMSGSRSV1: {
          STMTTRNRS: {
            TRNUID: '1001',
            STATUS: {
              CODE: '0',
              SEVERITY: 'INFO',
            },
            STMTRS: {
              CURDEF: 'BRL',
              BANKACCTFROM: {
                BANKID: '197',
                BRANCHID: agency,
                ACCTID: account,
                ACCTTYPE: 'CHECKING',
              },
              BANKTRANLIST: {
                DTSTART: startDate,
                DTEND: endDate,
                STMTTRN: [],
              },
              LEDGERBAL: {
                BALAMT: '2557.35', // total somado
                DTASOF: moment().format('YYYYMMDD'), // data do dia
              },
            },
          },
        },
      };

      itens.forEach((iten: Definitions['XlsxToOfx'], index: number) => {
        body.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.push({
          TRNTYPE: iten.Movimentacao === 'Crédito' ? 'CREDIT' : 'PAYMENT',
          DTPOSTED: this.convertDate(iten.Data || ''),
          TRNAMT: iten.Valor,
          FITID: `${this.convertDate(iten.Data || '')}197${index}`,
          CHECKNUM: '197',
          REFNUM: '197',
          MEMO:
            iten.Movimentacao === 'Crédito'
              ? `${iten.Tipo} ${iten.Situacao} ${iten.Origem} ${iten.OrigemDocumento} ${iten.OrigemConta} ${iten.OrigemInstituicao}`
              : `${iten.Tipo} ${iten.Situacao} ${iten.Destino} ${iten.DestinoAgencia} ${iten.DestinoConta}`,
        });
      });

      body.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.forEach(
        (item: any) => {
          if (item.TRNTYPE === 'CREDIT') {
            return (credit += item.TRNAMT);
          }
          return (debit += item.TRNAMT);
        }
      );

      const sumAccount = (debit + credit).toFixed(2);

      body.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL.BALAMT = sumAccount;

      const ofx = this.serialize(header, body);

      fs.writeFile(
        path.join(directoryPath, `extrato-${startDate}-${endDate}.ofx`),
        ofx,
        (err) => {
          if (err) throw err;
        }
      );
      return { Sucess: 'Arquivo criado com sucesso!' };
    } catch (error) {
      return error;
    }
  };
}
