require('dotenv').config();

module.exports = {
  apiServerAddress: process.env.API_SERVER || 'http://localhost:3333',
};
