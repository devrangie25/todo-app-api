const ajvInstance = require('./ajv.instance');

const schema = {
    type: 'object',
    properties: {
        firstname: { type: 'string'},
        lastname: { type: 'string'},
        username: { type: 'string'},
        email: { type: 'string', format: 'email' },
        password: { type: 'string', format: 'password' },
        active: { type: 'integer' }
    },
    required: ['email', 'password'],
    additionalProperties: false
}

module.exports = ajvInstance.compile(schema);
