var config = process.env.DB === 'DEV' && !process.env.TEST ? require('../config/dev.json') : require('../config/prod.json');

export default config;