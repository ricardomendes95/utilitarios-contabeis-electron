import api from '../api';

import { GetXlsxToOfxResponse } from './types';


export function getXlsxToOfx(directory: string) {
  return api.get<GetXlsxToOfxResponse[]>(
    `/xlsxToOfx/data/${directory}`
  );
}
