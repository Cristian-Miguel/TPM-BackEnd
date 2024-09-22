const winston = require('winston');
const { combine, timestamp, json, prettyPrint, errors } = winston.format;
const server_config = require( 'config' );


winston.loggers.add('GenericLogger', {
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
            filename:`${__dirname}/../../../../../../logs/genericErrors/generic-api.log` 
        })
    ],
    defaultMeta: {
        service: 'Service',
        enviroment: server_config.get( 'app.enviroment' )
    }
});


winston.loggers.add('AddressUserLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/addressUser/address-user-api.log` 
        })
    ],
    defaultMeta: {
        service: 'AddressUserService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

winston.loggers.add('AddressServiceLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/addressService/address-service-api.log` 
        })
    ],
    defaultMeta: {
        service: 'AddressServiceService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

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
            maxFiles: 10, 
            filename:`${__dirname}/../../../../../../logs/auth/auth-api.log` 
        })
    ],
    defaultMeta: {
        service: 'AuthService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

winston.loggers.add('HotelLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/hotel/hotel-api.log` 
        })
    ],
    defaultMeta: {
        service: 'HotelService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

winston.loggers.add('RestaurantLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/restaurant/restaurant-api.log` 
        })
    ],
    defaultMeta: {
        service: 'RestaurantService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

winston.loggers.add('ServiceLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/service/service-api.log`
        })
    ],
    defaultMeta: {
        service: 'ServiceService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

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
            filename:`${__dirname}/../../../../../../logs/user/user-api.log`
        })
    ],
    defaultMeta: {
        service: 'UserService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

winston.loggers.add('TokenLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/token/token-api.log` 
        })
    ],
    defaultMeta: { 
        service: 'ValidationService',
        enviroment: server_config.get( 'app.enviroment' )
    }
});

winston.loggers.add('SocketLogger', {
    level:'error',
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
            filename:`${__dirname}/../../../../../../logs/socket-api.log` 
        })
    ],
    defaultMeta: { 
        service: 'SocketService',
        enviroment: server_config.get( 'app.enviroment' ) 
    }
});