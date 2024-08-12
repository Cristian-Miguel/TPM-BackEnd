const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const winston = require('winston');
require( '../../../Shared/domain/log/Logger.js' );

class SocketService {

    constructor( ){

    }

    async sendMessage( emailSender, emailReceiver, message ) {
        
        try {

        } catch ( error ) {
            const user_logger = winston.loggers.get( 'SocketLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error try to create a message in a socket event`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error try to create a message in a socket event`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error try to create a message in a socket event`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }

    }
}

module.exports = SocketService;