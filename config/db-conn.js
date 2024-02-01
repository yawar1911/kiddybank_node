const mongoose = require('mongoose');
const CONFIG = require('./config');

module.exports = {
    dbConnect: async (eventEmitter) => {
        try {
            await mongoose.connect(CONFIG.DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });

            console.log(`Congratulation: ${CONFIG.DB_NAME} db is connected Successfully.`);
            eventEmitter.emit('cron-start');
        } catch (error) {
            console.error('Error in connecting with db');
            console.error(error);
            // Handle error or exit the process if necessary
        }
    }
};
