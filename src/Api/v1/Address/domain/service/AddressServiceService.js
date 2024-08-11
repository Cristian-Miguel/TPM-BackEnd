const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class AddressServiceService {

    constructor( AddressServiceRepository ) {
        this.AddressServiceRepository = AddressServiceRepository;

    }

    async createAddressService ({ street, city, state, zip_code, country, id_service }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.createAddressService(
                    prisma, street, city, state, zip_code, country, id_service
                );

            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressServiceService' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to created an address service`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when created an address service`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created an address service`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async deleteAsAdminAddressService ({ uuid_address_service }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.deleteAsAdminAddressService(
                    prisma, uuid_address_service
                );  
            });
            
            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressServiceService' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete an address service as an admin user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when created an delete service as an admin user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created an delete service as an admin user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async deleteAsUserAddressService ({ uuid_address_service }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.deleteAsUserAddressService(
                    prisma, uuid_address_service
                );
                
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressServiceService' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete an address service as a seller user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete an address service as a seller user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete an address service as a seller user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async updateAddressService ({ uuid_address_service, street, city, state, zip_code, country, id_service }) {

        try{
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.updateAddressService(
                    prisma, uuid_address_service, street, city, state, zip_code, country, id_service
                );
                
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressServiceService' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update an address service`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when update an address service`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update an address service`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async getAddressServicePagination ({ page, size, orderBy, filter }) {

        try {
            const skip = ( page - 1 ) * size;

            return await this.AddressServiceRepository.getAddressService(
                skip, size, orderBy, filter
            );

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressServiceService' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated an address service list`, {
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when paginated an address service list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated an address service list`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async getAddressServiceByUuid ({ uuid_address_service }) {

        try {
            return await this.AddressServiceRepository.getAddressServiceByUuid(
                uuid_address_service
            );

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressServiceService' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to created an address service`, {
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when created an address service`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created an address service`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

}

module.exports = AddressServiceService;
