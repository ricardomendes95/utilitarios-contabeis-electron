import { BrowserWindow } from 'electron';

import ChooseDirectoryHandler from './handlers/ChooseDirectoryHandler';
import ResponsabilityLatterHandler from './handlers/ResponsabilityLatterHandler';
import XlsxHandler from './handlers/XlsxHandler';
import ChoseFileHandler from './handlers/ChooseFileHandler';
import ConfigIPHandler from './handlers/ConfigIPHandler';
import BillsToPayHandler from './handlers/BillsToPayHandler';
import CompanyHandler from './handlers/CompanyHandler';

export default async function startup(window: BrowserWindow) {
  new ChooseDirectoryHandler().run(window);
  new ChoseFileHandler().run(window);
  new ResponsabilityLatterHandler().run(window);
  new XlsxHandler().run();
  new ConfigIPHandler().run();
  new BillsToPayHandler().run();
  new CompanyHandler().run();
}
