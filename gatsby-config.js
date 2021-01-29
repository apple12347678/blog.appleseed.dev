require('ts-node').register({ project: './gatsby/tsconfig.json' });

module.exports = require('./gatsby/config').default;
