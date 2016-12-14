var config = process.env.DB === 'DEV' ? require('../config/dev.json') : require('../config/prod.json');

export default config;