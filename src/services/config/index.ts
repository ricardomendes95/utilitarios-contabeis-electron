import api from '../api';
import Definitions from '../../core/types';
import { GetConfigIpDominioResponse } from './types';

import { send } from '../request';

export function saveIpDominio(data: Definitions['ConfigIpDominio']) {
  return send('ipServer:setIP', { data, cancelTimeout: false });
  // return api.post<GetConfigIpDominioResponse>('/config/ipDominioServer', form)
}
export function getIpDominio() {
  return send('ipServer:getIP', { cancelTimeout: false });
  // return api.get('/config/ipDominioServer')
}
