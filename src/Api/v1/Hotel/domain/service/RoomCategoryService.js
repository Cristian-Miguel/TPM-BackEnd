const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class RoomCategoryService {

    constructor( RoomCategoryRepository ) {
        this.RoomCategoryRepository = RoomCategoryRepository;

    }

    async createRoomCategory ({ description, number_beds, max_people, cost, discount_cash, discount_percentage }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.RoomCategoryRepository.createRoomCategory( prisma, description, number_beds, max_people, cost, discount_cash, discount_percentage );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a hotel room category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when created a hotel room category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created a hotel room category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteRoomCategory ({ id_hotel_room_category }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.RoomCategoryRepository.deleteRoomCategory( prisma, id_hotel_room_category );
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a hotel room category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when delete a hotel room category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a hotel room category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateRoomCategory ({ id_hotel_room_category, description, number_beds, max_people, cost, discount_cash, discount_percentage }) {
        
        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.RoomCategoryRepository
                    .updateRoomCategory( prisma, id_hotel_room_category, description, number_beds, max_people, cost, discount_cash, discount_percentage );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update a hotel room category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when update a hotel room category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update a hotel room category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getRoomCategoryPagination ({ page, size, orderBy, filter }) {

        try {
            const skip = ( page -1 ) * size;

            return await this.RoomCategoryRepository.getRoomCategoryById( skip, size, orderBy, filter );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated a hotel room category`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when paginated a hotel room category`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated a hotel room category`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getRoomCategoryById({ id_hotel_room_category }) {

        try {
            return await this.RoomCategoryRepository.getRoomCategoryById( id_hotel_room_category );

        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a hotel room category by id`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when get a hotel room category by id`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a hotel room category by id`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

}

module.exports = RoomCategoryService;