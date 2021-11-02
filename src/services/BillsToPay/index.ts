import axios from 'axios';
import api from '../api';
import Definitions from '../../core/types';
import { send } from '../request';

export function generate(form: Definitions['BillsToPayRequestDoc']) {
  return send('billsToPay:saveDoc', { data: form, cancelTimeout: false });
}

export async function getBillsToPays(idEmp: string, date: string) {
  // return api.get<Definitions['BillsToPay']>(`/billstopay/${date}&${idEmp}`);
  const { ipDominio } = await send('ipServer:getIP', { cancelTimeout: false });
  const form = { idEmp, date, ipDominio };
  return send('billsToPay:getBillToPays', {
    data: form,
    cancelTimeout: true,
  });
}
