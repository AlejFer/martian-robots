import convict from 'convict';

const config = convict({
    logger: {
        level: {
            doc: 'Level for logger',
            env: 'LOGGER_LEVEL',
            format: String,
            default: 'info'
        }
    },
    server: {
        port: {
            doc: 'Server port',
            env: 'SERVER_PORT',
            format: Number,
            default: 5000
        }
    }
});

config.loadFile([`${__dirname}/config.json`]);

export = config;