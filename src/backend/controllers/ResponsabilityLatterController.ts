/* eslint-disable no-await-in-loop */
/* eslint-disable promise/always-return */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow } from 'electron';
import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { renderEjs } from '../utils/ejsUtil';
import Definitions from '../../core/types';
import ConfigIPServerController from './ConfigIPServerController';

export default class ResponsabilityLatterController {
  constructor(private window: BrowserWindow) {}

  getFilePath = () => path.join(app.getPath('userData'), 'config-server.json');

  generateReportPDF = async (form: Definitions['CartaResponsabilidade']) => {
    const configIpServerController = new ConfigIPServerController();

    const { ipDominio } = await configIpServerController.getConfigServerData();
    console.log('entrou aqui');
    // const filePath = this.getFilePath();
    // if (!fs.existsSync(filePath)) {
    //   fs.writeFileSync(filePath, JSON.stringify({ ipDominio: '' }));
    // }

    // const fileContent = fs.readFileSync(filePath);

    // const { ipDominio } = JSON.parse(fileContent.toString());

    const baseURL = `http://${ipDominio}:8080`;
    const dominioApi = axios.create({ baseURL });

    try {
      const { registrationData, crc, startDate, endDate, saveLocation } = form;

      let lastUpdateDate = new Date();
      if (registrationData === 'inicial') {
        lastUpdateDate = startDate;
      } else if (registrationData === 'final') {
        lastUpdateDate = endDate;
      }

      const result = await dominioApi.get(
        `responsabilityLetter?lastUpdateDate=${lastUpdateDate.toISOString()}&crcType=${crc}`
      );

      const companies = result.data;

      const pdfErrors = [];

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < companies.length; i++) {
        const office = { ...form, ...companies[i] };

        try {
          // eslint-disable-next-line no-await-in-loop
          const pageContent = await renderEjs('ResponsabilityLetter.ejs', {
            office,
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
                `${saveLocation}/${office.razaoCliente}-${i}.pdf`,
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
          win?.close();
          wins?.close();
        } catch (error) {
          pdfErrors.push({ office, error });
        }
      }
    } catch (error) {
      console.log(error);
    }
    return 'feito';
  };
}
