import { BrowserWindow } from 'electron';
import Handler from './Handler';
import ResponsabilityLetterController from '../controllers/ResponsabilityLatterController';

export default class ResponsabilityLatterHandler extends Handler {
  constructor() {
    super('responsabilityLatter');
  }

  run = (window: BrowserWindow) => {
    const responsabilityLatterController = new ResponsabilityLetterController(
      window
    );

    this.on('report', responsabilityLatterController.generateReportPDF);
  };
}
