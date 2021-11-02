import Handler from './Handler';
import ConfigIPServerController from '../controllers/ConfigIPServerController';

export default class ConfigIPServerHandler extends Handler {
  constructor() {
    super('ipServer');
  }

  run = () => {
    const configIPServerController = new ConfigIPServerController();

    this.on('getIP', configIPServerController.getConfigServerData);
    this.on('setIP', configIPServerController.setConfigServerData);
  };
}
