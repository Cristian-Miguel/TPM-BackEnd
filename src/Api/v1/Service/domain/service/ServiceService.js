const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class ServiceService {

    constructor(ServiceRepository) {
        this.ServiceRepository = ServiceRepository;

    }

    async createService ({ service_type }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.ServiceRepository.createService( prisma, service_type );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'ServiceLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a service`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when created a service`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created a service`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteServiceAsAdmin({ id_relation_product }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.ServiceRepository.deleteServiceAsAdmin( prisma, id_relation_product );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'ServiceLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a service as an admin`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete a service as an admin`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a service as a admin`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateService({ service_type, id_relation_product }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.ServiceRepository.updateService( prisma, service_type, id_relation_product );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'ServiceLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update a service`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when update a service`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update a service`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getServiceByService({ service_type }) {

        try {
            return await this.ServiceRepository.getServiceByService( service_type );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'ServiceLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a service by service enum`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when get a service by service enum`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a service by service enum`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getServiceByUuid({ id_relation_product }) {

        try {
            return await this.ServiceRepository.getServiceByUuid( id_relation_product );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'ServiceLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a service by uuid`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when get a service by uuid`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a service by uuid`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getServicePagination({ page, size, orderBy, filter }) {

        try {
            return await this.ServiceRepository.getServicePagination( page, size, orderBy, filter );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'ServiceLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated a service list`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when paginated a service list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated a service list`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }
}

module.exports = ServiceService;