import { BrowserWindow, dialog } from 'electron';

export default class ChooseFileController {
  constructor(private window: BrowserWindow) {}

  openChooseFile = async () => {
    const result = await dialog.showOpenDialog(this.window, {
      properties: ['openFile'],
      filters: [{ name: 'Excel', extensions: ['xlsx'] }],
    });

    return result.filePaths;
  };
}
