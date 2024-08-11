const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class RestaurantCategoryService {

    constructor( RestaurantCategoryRepository ) {
        this.RestaurantCategoryRepository = RestaurantCategoryRepository;

    }

    async createCategory ({ description }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.RestaurantCategoryRepository.createCategory( prisma, description );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a restaurant category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when create a restaurant category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when create a restaurant category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateCategory ({ description }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.RestaurantCategoryRepository.updateCategory( prisma, description );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update a restaurant category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when update a restaurant category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update a restaurant category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteCategory({ id_restaurant_category }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.RestaurantCategoryRepository.deleteCategory( prisma, id_restaurant_category );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a restaurant category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete a restaurant category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a restaurant category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getCategoryById ({ id_restaurant_category }) {
        
        try {
            return await this.RestaurantCategoryRepository.getCategoryById( id_restaurant_category );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a restaurant category by id`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when get a restaurant category by id`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a restaurant category by id`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getCategoryPagination ({ page, size, orderBy, filter }) {

        try {
            const skip = ( page - 1 ) * size;
            return await this.RestaurantCategoryRepository.getCategoryPagination( skip, size, orderBy, filter );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated a restaurant category list`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when paginated a restaurant category list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated a restaurant category list`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

}

module.exports = RestaurantCategoryService;