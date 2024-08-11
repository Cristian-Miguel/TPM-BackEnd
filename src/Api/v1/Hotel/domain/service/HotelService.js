const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class HotelService {

    constructor( HotelRepository, ServiceRespository, AddressServiceRepository ) {
        this.HotelRepository = HotelRepository;
        this.ServiceRespository = ServiceRespository;
        this.AddressServiceRepository = AddressServiceRepository;

    }

    async createHotel ({ name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour,
        street, city, state, zip_code, country
     }) {
        
        try {
            const result = await prisma.$transaction(async (prisma) => {
                const service = await this.ServiceRepository.createService( prisma, 'HOTEL' );

                const hotel = await this.HotelService.createHotel
                    ( prisma, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour );
                
                const addressService = await this.AddressServiceRepository
                    .createAddressService( prisma, street, city, state, zip_code, country, service.id_service );

                return hotel;
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to create a hotel`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when created a hotel`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created a hotel`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteHotelAdmin ({ uuid }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.HotelService.deleteHotelAdmin ( prisma, uuid );
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a hotel`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when delete a hotel`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a hotel`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async deleteHotelSeller ({ uuid }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.HotelService.deleteHotelSeller( prisma, uuid );
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a hotel as a seller`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when delete a hotel as a seller`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a hotel as a seller`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async updateHotel ({ uuid_hotel, name, descrition, main_image, id_category, uuid_user, phone_number, email, website, open_hour, close_hour,
        street, city, state, zip_code, country
     }) {

        try {
            const id_service = await prisma.tbl_service.findUnique({
                where:{
                    id_relation_product: uuid_hotel
                }
            });

            const result = await prisma.$transaction(async (prisma) => {
                const hotel = await this.HotelService.updateHotel
                    ( prisma, uuid_hotel, name, descrition, main_image, id_category, uuid_user, phone_number, email, website, open_hour, close_hour );

                const addressService = await this.AddressServiceRepository.updateAddressService( prisma, street, city, state, zip_code, country, id_service );

                return hotel;
            });

            return result;
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete a hotel`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when delete a hotel`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete a hotel`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getHotelPagination ({ page, size, orderBy, filter }) {

        try {
            const skip = ( page - 1 ) * size;

            return await this.HotelService.getHotelPagination ( skip, size, orderBy, filter );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated a hotel list`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when paginated a hotel list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated a hotel list`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }

    async getHotelByUuid ({ uuid }) {

        try {

            return await this.HotelService.getHotelByUuid ( uuid );
            
        } catch ( error ) {
            const logger = winston.loggers.get( 'HotelLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to get a hotel by uuid`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                logger.error(`Error when get a hotel by uuid`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when get a hotel by uuid`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
        
    }
}

module.exports = HotelService;