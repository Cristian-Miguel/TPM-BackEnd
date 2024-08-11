const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class HotelRoomService {

    constructor( HotelRoomRepository ) {
        this.HotelRoomRepository = HotelRoomRepository;

    }

    async createHotelRoom ({ id_room_category, number_room, uuid_hotel }) {

        try {
            const id_hotel = prisma.tbl_hotel.findUnique({
                select:{
                    id_hotel: true
                },
                where:{
                    uuid_hotel
                }
            });

            const result = await prisma.$transaction(async (prisma) => {
                return this.HotelRoomRepository.createHotelRoom( prisma, id_room_category, number_room, id_hotel );
            });

            return result;
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a hotel room`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when created a hotel room`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created a hotel room`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async createManyHotelRoomByExcel({ rooms }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return this.HotelRoomRepository.createManyHotelRoom ( prisma, rooms );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create many hotel rooms by excel file`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when created many hotel rooms by excel file`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created many hotel rooms by excel file`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteRoomHotel ({ id_hotel_room }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return this.HotelRoomRepository.deleteRoomHotel( prisma, id_hotel_room );
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a hotel room`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when delete a hotel room`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a hotel room`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateRoomHotel ({ id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return this.HotelRoomRepository.updateRoomHotel( prisma, id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user );
            });

            return result;

        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update a hotel room`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when update a hotel room`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update a hotel room`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getRoomHotelPagination ({ page, size, orderBy, filter }) {
        try {
            const skip = ( page - 1 ) * size;

            return this.HotelRoomRepository.getRoomHotelPagination ( skip, size, orderBy, filter );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated a hotel room list`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when paginated a hotel room list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated a hotel room list`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getRoomHotelById ({ id_hotel_room }) {

        try {
            return this.HotelRoomRepository.getRoomHotelById ( id_hotel_room );
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a hotel room by id`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when get a hotel room by id`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a hotel room by id`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }
}

module.exports = HotelRoomService;