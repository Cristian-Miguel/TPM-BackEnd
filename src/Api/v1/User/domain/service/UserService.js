const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class UserService {
    constructor( UserRepository ) {
        this.UserRepository = UserRepository;

    }

    async createUser({ email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }){
        try{
            const result = await prisma.$transaction(async (prisma) => {
                return await this.UserRepository
                .createUser( prisma, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol );
            
            });

            return result;

        } catch ( error ) {
            const user_logger = winston.loggers.get( 'UserLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error in the database when try to created an user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error when try to created an user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error when try to created an user`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }
    }

    async deleteUser({ uuid }) {

        try{
            const result = await prisma.$transaction(async (prisma) => {
                return await this.UserRepository.deleteUser( prisma, uuid );
            });

            return result;

        } catch ( error ) {
            const user_logger = winston.loggers.get( 'UserLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error in the database when try to delete an user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error when try to delete an user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error when try to created an user`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }

    }

    async updateUser({ uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.UserRepository
                    .updateUser( prisma, uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol );
            });

            return result;
        } catch ( error ) {
            const user_logger = winston.loggers.get( 'UserLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error in the database when try to update an user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error when try a update an user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error when try a update an user`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }

    }

    async getUserByUuid({ uuid }) {

        try{
            return await this.UserRepository.getUserByUuid( uuid );

        } catch ( error ) {
            const user_logger = winston.loggers.get( 'UserLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error in the database when try to get an user by uuid`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error when try to get an user by uuid`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error when try to get an user by uuid`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }

    }

    async getUserByEmail({ email }) {
        try {
            return await this.UserRepository.getUserByEmail( email );
        
        } catch ( error ) {
            const user_logger = winston.loggers.get( 'UserLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error in the database when try to created a user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error when try a created a user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error when try a created a user`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }

    }

    /**
     * Fetch paginated user
     * @param { number } page - The page number 
     * @param { number } size - The size of items per page
     * @param { array } orderBy  - The field that applied a order by
     * @param { array } filter - The fields that applied the filter
     */
    async getUsersByPagination({ page, size, orderBy, filter }) {

        try{
            const skip = ( page - 1 ) * size;

            const [ data, count ] = await this.UserRepository.getUsersByPagination( skip, size, orderBy, filter );

            return {
                data, 
                count,
                page,
                size
            }

        } catch ( error ) {
            const user_logger = winston.loggers.get( 'UserLogger' );

            if(error instanceof PrismaError) {
                const { code, meta, message, clientVersion, typeErrorPrisma } = error;

                user_logger.error(`Error in the database when try to paginated a list user`,{
                    prismaErrorType: typeErrorPrisma,
                    prismaCode: code,
                    prismaMeta: meta,
                    prismaMessage: message,
                    prismaClientVersion: clientVersion
                });

                throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

            } else if(error instanceof Error) {
                user_logger.error(`Error when try to paginated a list user`, {
                    genericName: error.name,
                    genericMessage: error.message,
                    genericStack: error.stack
                });

                throw new Error( error );

            } else {
                user_logger.error(`Error when try to paginated a list user`, {
                    genericError: error,
                });

                throw new Error( error );

            }

        }

    }

}

module.exports = UserService;