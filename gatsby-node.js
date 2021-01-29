require('ts-node').register({ project: './gatsby/tsconfig.json' });
require('dotenv').config();

exports.createPages = require('./gatsby/node').createPages;
exports.onCreateNode = require('./gatsby/node').onCreateNode;
exports.onCreatePage = require('./gatsby/node').onCreatePage;
exports.createSchemaCustomization = require('./gatsby/node').createSchemaCustomization;
exports.onCreateBabelConfig = require('./gatsby/node').onCreateBabelConfig;
