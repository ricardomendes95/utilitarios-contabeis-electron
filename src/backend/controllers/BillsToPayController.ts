/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { BrowserWindow } from 'electron';
import fs from 'fs';
import moment from 'moment';
import Definitions from '../../core/types';
import { send } from '../../services/request';
import { renderEjs } from '../utils/ejsUtil';

export default class BillsToPayController {
  getBillsToPays = async (data: Definitions['BillsToPayRequest']) => {
    try {
      const { ipDominio, idEmp, date } = data;
      const baseURL = `http://${ipDominio}:8080`;
      const apii = axios.create({ baseURL });
      const result = await apii.get<Definitions['BillsToPay'][]>(
        `/billstopay?date=${date}&idEmp=${idEmp}`
      );

      return result.data;
    } catch (error) {
      return error;
    }
  };

  getDocFiles = async (form: Definitions['BillsToPayRequestDoc']) => {
    const values: number[] = [];
    form.billsToPays.forEach((billsToPay) => {
      const v = billsToPay.reduce(
        (tota: number, next: any) => tota + next.vbru,
        0
      );
      values.push(v);
    });

    const total = values.reduce((tot, next) => tot + next, 0);

    const paymentsObj = Object.assign(form, {
      dateOfCreate: moment()
        .locale('pt-br')
        .format(' Do MMMM  YYYY, h:mm:ss a'),
      total,
    });
    try {
      // eslint-disable-next-line no-await-in-loop
      const typeDocument =
        paymentsObj.typeDoc === 'Analítico'
          ? 'BillsToPaysAnalitico.ejs'
          : 'BillsToPaysSintetico.ejs';

      const pageContent = await renderEjs(typeDocument, {
        paymentsObj,
      });

      const wins = new BrowserWindow({
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
        },
      });
      wins?.hide();

      await wins.loadURL(
        `data:text/html;charset=utf-8,${encodeURIComponent(pageContent)}`
      );

      const win = BrowserWindow.fromWebContents(wins.webContents);

      await win?.webContents
        .printToPDF({
          printBackground: true,
          landscape: false,
          pageSize: 'A4',
          scaleFactor: 90,
        })
        .then((data: any) => {
          fs.writeFile(
            `${paymentsObj.saveLocation}/${paymentsObj.company.razao}-${moment(
              paymentsObj.date
            ).format('DD-MM-YYYY')}-${paymentsObj.typeDoc}.pdf`,
            data,
            function (error) {
              if (error) {
                throw error;
              }
              // shell.openExternal(`file://${pdfPath}`);
              // event.sender.send('wrote-pdf', pdfPath);
            }
          );
        });
      // win?.close();
      wins?.close();
      return 'feito';
    } catch (error) {
      return error;
    }
  };
}
