const winston = require('winston');
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

winston.loggers.add('AuthLogger', {
    level:'info',
    format: combine(
        errors({ stack: true }),
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            maxsize: 512000,
            maxFiles: 5, 
            filename:`${__dirname}/../../logs/auth-api.log` 
        })
    ],
    defaultMeta: {service: 'AuthenticationService'}
});

winston.loggers.add('TokenLogger', {
    level:'info',
    format: combine(
        errors({ stack: true }),
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            maxsize: 512000,
            maxFiles: 5, 
            filename:`${__dirname}/../../logs/token-api.log` 
        })
    ],
    defaultMeta: { service: 'ValidationService' }
})

winston.loggers.add('UserLogger', {
    level:'info',
    format: combine(
        errors({ stack: true }),
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ 
            maxsize: 512000,
            maxFiles: 5, 
            filename:`${__dirname}/../../logs/user-api.log`
        })
    ],
    defaultMeta: {service: 'UserService'}
})

winston.loggers.add('ProductsLogger', {
    level:'info',
    format: combine(
        errors({ stack: true }),
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({
            maxsize: 512000,
            maxFiles: 5, 
            filename:`${__dirname}/../../logs/products-api.log` 
        })
    ],
    defaultMeta: {service: 'ProductsService'}
})