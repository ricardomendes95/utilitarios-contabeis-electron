import { BrowserWindow } from 'electron';

import Handler from './Handler';
import ChooseFileController from '../controllers/ChooseFileController';

export default class ChooseFileHandler extends Handler {
  constructor() {
    super('chooseFile');
  }

  run = (window: BrowserWindow) => {
    const chooseFileController = new ChooseFileController(window);

    this.on('open', chooseFileController.openChooseFile);
  };
}
