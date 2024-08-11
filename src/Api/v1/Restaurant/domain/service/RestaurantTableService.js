const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class RestaurantTableService {

    constructor( RestaurantTableRepository ) {
        this.RestaurantTableRepository = RestaurantTableRepository;

    }

    async createTable({ number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved }) {

        try {
            const result = prisma.$transaction(async (prisma) => {
                return await this.RestaurantTableRepository
                    .createTable( prisma, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a restaurant table`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when create a restaurant tabel`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when create a restaurant table`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async createTablesExtractingExcelData( file_path, uuid_restaurant ) {

        try {
            const result = prisma.$transaction(async (prisma) => {
                return await this.RestaurantTableRepository
                    .createTables( prisma, file );
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create restaurant tables by excel`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when create restaurant tables by excel`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when create restaurant tables by excel`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async createTablesExtractingCSVData( file_path, uuid_restaurant ) {

        try {
            const result = prisma.$transaction(async (prisma) => {
                return await this.RestaurantTableRepository
                    .createTables( prisma, file );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create restaurant tables by csv`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when create restaurant tables by csv`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when create restaurant tables by csv`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateTable({ id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved }) {

        try {
            const result = prisma.$transaction(async (prisma) => {
                return await this.RestaurantTableRepository
                    .updateTable( prisma, id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved );
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update a restaurant table`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when update a restaurant table`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update a restaurant table`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteTable({ id_restaurant_table }) {

        try {
            const result = prisma.$transaction(async (prisma) => {
                return await this.RestaurantTableRepository
                    .deleteTable( prisma, id_restaurant_table );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a restaurant table`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete a restaurant table`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a restaurant table`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteTables({ listIds }){

        try {
            const result = prisma.$transaction(async (prisma) => {
                return await this.RestaurantTableRepository
                    .deleteTables( prisma, listIds );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete restaurant tables`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete restaurant tables`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete restaurant tables`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getTableById({ id_restaurant_table }) {

        try {
            return await this.RestaurantTableRepository.getTableById( id_restaurant_table );

        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get restaurant table by id`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when get restaurant table by id`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get restaurant table by id`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getTablesByRestaurant({ uuid_restaurant }) {

        try {
            return await this.RestaurantTableRepository.getTablesByRestaurant( uuid_restaurant );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get restaurant table by uuid restaurant`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when get restaurant table by uuid restaurant`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get restaurant table by uuid restaurant`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getTablesPagination({ page, size, orderBy, filter }) {
        
        try {
            return await this.RestaurantTableRepository.getTablesPagination( page, size, orderBy, filter );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated a restaurant table list`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when paginated a restaurant table list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated a restaurant table list`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }
}

module.exports = RestaurantTableService;
