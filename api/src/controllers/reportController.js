const { dominioApi } = require('../utils/axios');
const reportService = require('../services/reportService');

module.exports = {
  async getCompany(request, response) {
    try {
      const { id } = request.params;

      const data = await dominioApi.get(
        `/responsabilityLetter/company/?id=${id}`
      );

      return response.json(data.data);
    } catch (error) {
      return response.status(500).json(error);
    }
  },

  async getCompanies(request, response) {
    try {
      const { registrationData, crc, startDate, endDate } = request.query;

      const companies = await reportService.getCompanies({
        registrationData,
        crc,
        startDate,
        endDate,
      });

      return response.json(companies);
    } catch (error) {
      return response.status(500).json(error);
    }
  },
};
