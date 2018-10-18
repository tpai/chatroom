/* global API_SERVER_ADDRESS */

import { upload } from 'utils/fetch';

export const uploadFile = (files) => {
  const form = new FormData();
  files.map((file) => form.append('files[]', file));
  return upload(`${API_SERVER_ADDRESS}/upload`, form);
};
