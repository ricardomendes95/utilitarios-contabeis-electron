import { BrowserWindow } from 'electron';

import Handler from './Handler';
import ChooseDirectoryController from '../controllers/ChooseDirectoryController';

export default class ChooseDirectoryHandler extends Handler {
  constructor() {
    super('chooseDirectory');
  }

  run = (window: BrowserWindow) => {
    const chooseDirectoryController = new ChooseDirectoryController(window);

    this.on('open', chooseDirectoryController.openChooseDirectory);
  };
}
