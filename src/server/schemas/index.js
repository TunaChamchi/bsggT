const mongoose = require('mongoose');
const { logger } = require("../config/logConfig");

const MONGO_URL = 'mongodb://192.168.0.155:27017/talk'

module.exports = () => {
    const connect = () => {
        mongoose.connect(MONGO_URL, {
            dbName: 'talk',
        }, (error) => {
            if (error) {
                logger.error('mongo fail' + error);
            }
        });
    };
    connect();

    mongoose.connection.on('error', (error) => {
        logger.error('mongo fail' + error);
    });
    mongoose.connection.on('disconnected', (error) => {  
        logger.error('mongo disconnected' + error);
        connect();
    });

    mongoose.set('useFindAndModify', false);

    require('./talk');
};