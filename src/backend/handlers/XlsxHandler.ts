import Handler from './Handler';
import XlsxController from '../controllers/XlsxController';

export default class XlsxHandler extends Handler {
  constructor() {
    super('xlsx');
  }

  run = () => {
    const xlsxController = new XlsxController();

    this.on('read', xlsxController.read);
    this.on('convertOfx', xlsxController.convertOfx);
  };
}
