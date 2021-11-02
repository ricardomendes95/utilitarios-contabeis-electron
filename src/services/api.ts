import axios from 'axios';
import ConfigIPServerController from '../backend/controllers/ConfigIPServerController';

const configIPServerController = new ConfigIPServerController();
const ip = configIPServerController.getConfigServerData;
const api = axios.create({
  baseURL: `http://${ip}:8080`,
});

export default api;
