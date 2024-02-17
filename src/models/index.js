// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.SERVER_NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const CONFIG = require('../config')

const sequelize = new Sequelize(
    CONFIG.DB_NAME,
    CONFIG.DB_USER,
    CONFIG.DB_PASSWORD,
    {
        host: CONFIG.DB_HOST,
        dialect: CONFIG.DB_DIALECT,
    }
);

sequelize.authenticate().then(() => {
    console.log('Authenticate Sequelize')
}).catch(err => {
    console.log('Sequelize Error', err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db['user'] = require('../models/user')(sequelize, DataTypes)
db['todo'] = require('../models/todo')(sequelize, DataTypes)

// db.sequelize.sync({ force: false }).then(() => {
//     console.log('Sequelize Sync Tables Done')
// }).catch(err => {
//     console.log('Sequelize Error in Sync Tables', err)
// })

// 1 to Many Relation

db['user'].hasMany(db['todo'], { as: 'user_todos', foreignKey: 'user_id' });
db['todo'].belongsTo(db['user'], { as: 'user', foreignKey: 'user_id' });

// db['user'].hasMany(db['todo'], {
//     foreignKey: 'user_id',
//     as: 'user'
// })

// // db.products.hasMany(db.reviews, {
    // foreignKey: 'product_id',
    // as: 'review'
// })

// db.reviews.belongsTo(db.products, {
//     foreignKey: 'product_id',
//     as: 'product'
// })


module.exports = db


