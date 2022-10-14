/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import Definitions from '../../core/types';

export default class BillsToPayController {
  getCompany = async (data: string) => {
    try {
      const ipDominio = '192.168.0.18';
      const baseURL = `http://${ipDominio}:8080`;
      const apii = axios.create({ baseURL });
      const result = await apii.get<Definitions['CompanyResponsabilityLatter']>(
        `/responsabilityLetter/company/?id=${data}`
      );
      console.log(result.data);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
