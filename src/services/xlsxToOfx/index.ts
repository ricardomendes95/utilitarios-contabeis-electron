/* eslint-disable import/prefer-default-export */
import { send } from '../request';

export function read(data: string) {
  return send('xlsx:read', { data, cancelTimeout: true });
}

export function convertOfx(data: {
  saveDirectory: string;
  fileDirectory: string;
}) {
  return send('xlsx:convertOfx', { data, cancelTimeout: true });
}
