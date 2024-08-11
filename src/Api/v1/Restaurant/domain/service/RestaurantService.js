const prisma = require("../../../Shared/domain/database/PrismaCliente");
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class RestaurantService {

    constructor( RestaurantRepository, ServiceRepository, AddressServiceRepository ) {
        this.RestaurantRepository = RestaurantRepository;
        this.ServiceRepository = ServiceRepository;
        this.AddressServiceRepository = AddressServiceRepository;

    }

    async createRestaurant ({ name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, 
        open_hour, close_hour, street, city, state, zip_code, country }) {
        
        try {
            const result = await prisma.$transaction( async (prisma) => {

                const service = await this.ServiceRepository.createService( prisma, 'RESTAURANT' );

                const restaurant = await this.RestaurantRepository.createRestaurant( prisma, service.id_relation_product,
                    name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour );

                const addressService = await this.AddressServiceRepository.createAddressService( prisma, street, city, state, zip_code, country, service.id_service );

                return  restaurant;
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a restaurant`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when create a restaurant`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when create a restaurant`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateRestaurant ({ uuid_restaurant, name, descripcion, main_image, id_user, id_restaurant_category, email,
        phone_number, webside, open_hour, close_hour, street, city, state, zip_code, country }) {

        try {
            const id_service = await prisma.tbl_service.findUnique({
                where:{
                    id_relation_product: uuid_restaurant
                }
            });

            const result = await prisma.$transaction( async (prisma) => {

                const restaurant = await this.RestaurantRepository.updateRestaurant( prisma, uuid_restaurant,
                    name, descripcion, main_image, id_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour );

                const addressService = await this.AddressServiceRepository.updateAddressService( prisma, street, city, state, zip_code, country, id_service );

                return restaurant;

            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update a restaurant`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when update a restaurant`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update a restaurant`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteAsSeller ({ uuid_restaurant }) {
        try {
            const result = await prisma.$transaction( async (prisma) => {

                return await this.RestaurantRepository.deleteAsSeller( prisma, uuid_restaurant );

            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a restaurant as a seller`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete a restaurant as a seller`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a restaurant as a seller`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteAsAdmin ({ uuid_restaurant }) {
        try {

            const result = await prisma.$transaction( async (prisma) => {
                const restaurant = await this.RestaurantRepository.deleteAsAdmin( prisma, uuid_restaurant );

                const service = await this.ServiceRepository.deleteAsAdmin( prisma, uuid_restaurant );

                return restaurant;
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a restaurant as a admin`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete a restaurant as a admin`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a restaurant as a admin`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getRestaurantByUuid ({ uuid_restaurant }) {

        try {
            return await this.RestaurantRepository.getRestaurantByUuid( uuid_restaurant );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a restaurant by uuid`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when get a restaurant by uuid`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a restaurant by uuid`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getRestaurantPagination({ page, size, orderBy, filter }) {
        
        try {
            const skip = ( page - 1 ) * size;

            return await this.RestaurantRepository.getRestaurantPagination( page, size, orderBy, filter );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'RestaurantLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a restaurant`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when create a restaurant`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when create a restaurant`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

}

module.exports = RestaurantService;