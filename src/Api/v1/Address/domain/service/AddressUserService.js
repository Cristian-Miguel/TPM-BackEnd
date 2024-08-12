const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class AddressUserService {

    constructor( AddressUserRepository ) {
        this.AddressUserRepository = AddressUserRepository;

    }

    async createAddressUser ({ street, city, state, postal_code, country, uuid_user }) {

        try {
            const user = prismaSQL.tbl_user.findUnique({
                select:{
                    id_user: true
                },
                where:{
                    uuid_user
                }
            });
            
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.createAddressUser(
                    prisma, street, city, state, postal_code, country, user.id_user
                );

            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressUserLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to created an address user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when created an address user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when created an address user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async deleteAddressUserAdmin ({ uuid_address_user }) {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.deleteAsAdminAddressUser(
                    prisma, uuid_address_user
                );  
            });
            
            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressUserLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete an address user as an admin user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete an address user as an admin user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete an address user as an admin user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async deleteAddressUser ({ uuid_address_user }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.deleteAsUserAddressUser(
                    prisma, uuid_address_user
                );
                
            });

            return result;
        
        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressUserLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete an address user as an user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete an address user as an user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete an address user as an user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }

    }

    async updateAddressUser ({ uuid_address_user,  street, city, state, postal_code, country, uuid_user }) {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.updateAddressUser(
                    prisma, uuid_address_user, street, city, state, postal_code, country, uuid_user
                );
                
            });

            return result;

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressUserLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to update an address user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when update an address user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when update an address user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }
        
    }

    async getAddressUserPagination ({ page, size, orderBy, filter }) {

        try {
            const skip = ( page - 1 ) * size;

            return await this.AddressUserRepository.getAddressUser(
                skip, size, orderBy, filter
            );

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressUserLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to paginated an address user list`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when paginated an address user list`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when paginated an address user list`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }

    }

    async getAddressUserByUuid ({ uuid_address_user }) {
        try {
            return await this.AddressUserRepository.getAddressUserByUuid(
                uuid_address_user
            );

        } catch ( error ) {
            const logger = winston.loggers.get( 'AddressUserLogger' );

            if( error instanceof PrismaError ) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                logger.error(`Error in the database when try to delete an address user as an admin user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if( error instanceof Error ) {
                logger.error(`Error when delete an address user as an admin user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                logger.error(`Error when delete an address user as an admin user`, {
                    genericError: error,
                });

                throw new Error( error );

            }
            
        }

    }

}

module.exports = AddressUserService;