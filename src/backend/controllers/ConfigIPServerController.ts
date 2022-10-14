/* eslint-disable class-methods-use-this */
import fs from 'fs';
import path from 'path';
import { app } from 'electron';

import Definitions from '../../core/types';

export default class ConfigIPServerController {
  getFilePath = () => path.join(app.getPath('userData'), 'config-server.json');

  getConfigServerData = () => {
    try {
      const filePath = this.getFilePath();
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify({ ipDominio: '' }));
      }

      const fileContent = fs.readFileSync(filePath);

      return JSON.parse(fileContent.toString());
    } catch (error) {
      return error;
    }
  };

  setConfigServerData = (data: Definitions['ConfigIpDominio']) => {
    try {
      const fileContent = this.getConfigServerData();

      if (!fileContent) {
        return new Error('Não Encontrou o arquivo!');
      }

      fileContent.ipDominio = data.ipServer;

      fs.writeFileSync(this.getFilePath(), JSON.stringify(fileContent));

      return 'feito';
    } catch (err) {
      return err;
    }
  };
}
