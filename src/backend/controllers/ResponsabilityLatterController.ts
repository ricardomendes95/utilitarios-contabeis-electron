/* eslint-disable no-await-in-loop */
/* eslint-disable promise/always-return */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserWindow } from 'electron';
import fs from 'fs';
import { renderEjs } from '../utils/ejsUtil';
import Definitions from '../../core/types';
import api from '../../services/api';

export default class ResponsabilityLatterController {
  constructor(private window: BrowserWindow) {}

  generateReportPDF = async (form: Definitions['CartaResponsabilidade']) => {
    try {
      const { registrationData, crc, startDate, endDate, saveLocation } = form;
      const companiesResponse = await api.get('/reports/companies', {
        params: {
          registrationData,
          crc,
          startDate,
          endDate,
        },
      });

      const companies = companiesResponse.data;

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
