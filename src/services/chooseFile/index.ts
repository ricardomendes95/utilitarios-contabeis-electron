import { send } from '../request';

export default {
  openChooseFile() {
    return send<string[]>('chooseFile:open', { cancelTimeout: true });
  },
};
