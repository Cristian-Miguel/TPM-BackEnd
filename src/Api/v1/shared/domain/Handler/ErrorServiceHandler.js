const PrismaError = require('../database/PrismaError');
const FilterError = require( '../exception/FilterError' );
const OrderByError = require( '../exception/OrderByError' );
const winston = require('winston');
require( '../log/Logger' );

class ErrorServiceHandler {
    static _handleError( error, message = 'Bad thing happend', loggerName = 'GenericLogger' ) {
        const user_logger = winston.loggers.get( loggerName );
        
        if(error instanceof PrismaError) {
            const { code, meta, message, clientVersion, typeErrorPrisma } = error;

            user_logger.error(message, {
                prismaErrorType: typeErrorPrisma,
                prismaCode: code,
                prismaMeta: meta,
                prismaMessage: message,
                prismaClientVersion: clientVersion
            });

            throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );
        } else if(error instanceof OrderByError) {
            user_logger.error(message, {
                genericName: "Order by error",
                genericMessage: error.clientResponse,
                genericStack: error.stack
            });

            throw new OrderByError( error.clientResponse );

        } else if(error instanceof FilterError) {
            user_logger.error(message, {
                genericName: "Filter error",
                genericMessage: error.clientResponse,
                genericStack: error.stack
            });

            throw new FilterError( error.clientResponse );

        } else if(error instanceof Error) {
            user_logger.error(message, {
                genericName: error.name,
                genericMessage: error.message,
                genericStack: error.stack
            });

            throw new Error( error );

        } else {
            user_logger.error(message, {
                genericError: error,
            });

            throw new Error( error );

        }
    }
}

module.exports = ErrorServiceHandler;