const Ajv = require('ajv');
const formats = require('ajv-formats');

const ajvInstance = new Ajv({ allErrors: true });
formats(ajvInstance);

module.exports = ajvInstance