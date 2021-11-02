import Handler from './Handler';
import CompanyController from '../controllers/CompanyController';

export default class CompanyHandler extends Handler {
  constructor() {
    super('company');
  }

  run = () => {
    const companyController = new CompanyController();

    this.on('getCompany', companyController.getCompany);
  };
}
