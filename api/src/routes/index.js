const routes = require('express').Router();

const reportRoutes = require('./reports');
const configurationRoutes = require('./configurations');
const xlsxToOfxRoutes = require('./xlsxToOfx');

routes.use('/reports', reportRoutes);
routes.use('/config', configurationRoutes);
routes.use('/xlsxToOfx', xlsxToOfxRoutes);

module.exports = routes;
