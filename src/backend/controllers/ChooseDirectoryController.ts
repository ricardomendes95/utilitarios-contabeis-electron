import { BrowserWindow, dialog } from 'electron';

export default class ChooseDirectoryController {
  constructor(private window: BrowserWindow) {}

  openChooseDirectory = async () => {
    const result = await dialog.showOpenDialog(this.window, {
      properties: ['openDirectory'],
    });

    return result.filePaths;
  };
}
