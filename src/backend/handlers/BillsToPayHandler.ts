import Handler from './Handler';
import BillsToPayController from '../controllers/BillsToPayController';

export default class BillsToPayHandler extends Handler {
  constructor() {
    super('billsToPay');
  }

  run = () => {
    const billsToPayController = new BillsToPayController();

    this.on('getBillToPays', billsToPayController.getBillsToPays);
    this.on('saveDoc', billsToPayController.getDocFiles);
  };
}
