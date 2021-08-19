import { BrowserWindow } from 'electron';

import ChooseDirectoryHandler from './handlers/ChooseDirectoryHandler';
import ResponsabilityLatterHandler from './handlers/ResponsabilityLatterHandler';

export default async function startup(window: BrowserWindow) {
  new ChooseDirectoryHandler().run(window);
  new ResponsabilityLatterHandler().run(window);
}
