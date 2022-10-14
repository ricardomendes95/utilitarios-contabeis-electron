/* eslint-disable import/no-cycle */
import axios from 'axios';
import { ConfigService } from '..';
import Definitions from '../../core/types';
import { send } from '../request';

export function generate(form: Definitions['CartaResponsabilidade']) {
  return send('chooseDirectory:report', { data: form, cancelTimeout: false });
  // return api.post<Definitions['CartaResponsabilidade']>('/reports', form);
}

export async function getCompany(id: string) {
  try {
    const { ipDominio } = await ConfigService.getIpDominio();
    const baseURL = `http://${ipDominio}:8080`;
    const apii = axios.create({ baseURL });
    const result = await apii.get<Definitions['CompanyResponsabilityLatter']>(
      `/responsabilityLetter/company/?id=${id}`
    );
    return result;
  } catch (error) {
    return error;
  }

  // return api.get<Definitions['CompanyResponsabilityLatter']>(
  //   `/reports/company/${id}`
  // );
}

export function generateReportPDF(data: Definitions['CartaResponsabilidade']) {
  console.log('vai chamar');

  return send('responsabilityLatter:report', {
    data,
    cancelTimeout: true,
  });
}
