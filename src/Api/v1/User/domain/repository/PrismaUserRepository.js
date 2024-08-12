const UserRepository = require( './UserRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, 
        PrismaClientInitializationError, PrismaClientValidationError } = require('@prisma/client');
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaUserRepository extends UserRepository {

    async createUser ( prismaSQL, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ) {
        try {
            const now = new Date().toISOString();

            const user = await prismaSQL.tbl_user.create({
                data: {
                    email:          email,
                    username:       username,
                    image_profile:  image_profile,
                    password:       password,
                    first_name:     first_name,
                    last_name:      last_name,
                    birth_day:      birth_day,
                    token:          token,
                    refresh_token:  refresh_token,
                    last_logger:    now,
                    user_create:    now,
                    google_sign:    google_sign,
                    last_update:    now,
                    id_rol:         id_rol
                }
            });
        
            return user;

        } catch( error ) {
            if( error instanceof PrismaClientKnownRequestError ) {
                const { code, meta, message, clientVersion } = error;

                throw new PrismaError( code, meta, message, clientVersion, 'PrismaClientKnownRequestError' );

            } else if( error instanceof PrismaClientUnknownRequestError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientUnknownRequestError' );

            } else if( error instanceof PrismaClientRustPanicError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientRustPanicError' );

            } else if( error instanceof PrismaClientInitializationError ) {
                const { errorCode, message, clientVersion } = error;

                throw new PrismaError( errorCode, '', message, clientVersion, 'PrismaClientInitializationError' );

            } else if( error instanceof PrismaClientValidationError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientValidationError' );

            } else {
                throw new Error( error );

            }

        }

    }

    async deleteUser( prismaSQL, uuid ) {

        try {
            return await prismaSQL.tbl_user.delete({
                where:{
                    uuid_user: uuid
                }
            });

        } catch( error ) {
            if( error instanceof PrismaClientKnownRequestError ) {
                const { code, meta, message, clientVersion } = error;

                throw new PrismaError( code, meta, message, clientVersion, 'PrismaClientKnownRequestError' );

            } else if( error instanceof PrismaClientUnknownRequestError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientUnknownRequestError' );

            } else if(error instanceof PrismaClientRustPanicError) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientRustPanicError' );

            } else if( error instanceof PrismaClientInitializationError ) {
                const { errorCode, message, clientVersion } = error;

                throw new PrismaError( errorCode, '', message, clientVersion, 'PrismaClientInitializationError' );

            } else if( error instanceof PrismaClientValidationError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientValidationError' );

            } else {
                throw new Error( error );

            }

        }

    }

    async updateUser( prismaSQL, uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ) {
        
        try {
            return prismaSQL.tbl_user.update({
                data: {
                    email:          email,
                    username:       username,
                    image_profile:  image_profile,
                    password:       password,
                    first_name:     first_name,
                    last_name:      last_name,
                    birth_day:      birth_day,
                    token:          token,
                    refresh_token:  refresh_token,
                    last_logger:    new Date().toISOString(),
                    user_create:    new Date().toISOString(),
                    google_sign:    google_sign,
                    last_update:    new Date().toISOString(),
                    id_rol:         id_rol
                },
                where:{
                    uuid_user: uuid
                }
            });

        } catch( error ) {
            if( error instanceof PrismaClientKnownRequestError ) {
                const { code, meta, message, clientVersion } = error;

                throw new PrismaError( code, meta, message, clientVersion, 'PrismaClientKnownRequestError' );

            } else if( error instanceof PrismaClientUnknownRequestError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientUnknownRequestError' );

            } else if( error instanceof PrismaClientRustPanicError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientRustPanicError' );

            } else if( error instanceof PrismaClientInitializationError ) {
                const { errorCode, message, clientVersion } = error;

                throw new PrismaError( errorCode, '', message, clientVersion, 'PrismaClientInitializationError' );

            } else if( error instanceof PrismaClientValidationError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientValidationError' );

            } else {
                throw new Error( error );

            }

        }

    }

    async getUserByUuid( uuid ) {
        try {
            return await prisma.tbl_user.findUnique({
                where:{
                    uuid_user: uuid
                }
            });

        } catch( error ) {
            if( error instanceof PrismaClientKnownRequestError ) {
                const { code, meta, message, clientVersion } = error;

                throw new PrismaError( code, meta, message, clientVersion, 'PrismaClientKnownRequestError' );

            } else if( error instanceof PrismaClientUnknownRequestError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientUnknownRequestError' );

            } else if( error instanceof PrismaClientRustPanicError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientRustPanicError' );

            } else if( error instanceof PrismaClientInitializationError ) {
                const { errorCode, message, clientVersion } = error;

                throw new PrismaError( errorCode, '', message, clientVersion, 'PrismaClientInitializationError' );

            } else if( error instanceof PrismaClientValidationError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientValidationError' );

            } else {
                throw new Error( error );

            }

        }

    }

    async getUserByEmail( email ) {

        try {
            return prisma.tbl_user.findUnique({
                where:{
                    email: email
                }
            });

        } catch( error ) {
            if( error instanceof PrismaClientKnownRequestError ) {
                const { code, meta, message, clientVersion } = error;

                throw new PrismaError( code, meta, message, clientVersion, 'PrismaClientKnownRequestError' );

            } else if( error instanceof PrismaClientUnknownRequestError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientUnknownRequestError' );

            } else if( error instanceof PrismaClientRustPanicError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientRustPanicError' );

            } else if( error instanceof PrismaClientInitializationError ) {
                const { errorCode, message, clientVersion } = error;

                throw new PrismaError( errorCode, '', message, clientVersion, 'PrismaClientInitializationError' );

            } else if( error instanceof PrismaClientValidationError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientValidationError' );

            } else {
                throw new Error( error );

            }

        }

    }

    async getUserPagination( skip, take, orderBy, filter ) {

        try { 
            const [ data, total ] = await Promise.all([
                prisma.tbl_user.findMany({
                    skip,
                    take,
                    orderBy: orderBy,
                    where: filter
                }),
                prisma.tbl_user.count({
                    filter
                }),
            ]);

            return [ data, total ];

        } catch( error ) {
            if( error instanceof PrismaClientKnownRequestError ) {
                const { code, meta, message, clientVersion } = error;

                throw new PrismaError( code, meta, message, clientVersion, 'PrismaClientKnownRequestError' );

            } else if( error instanceof PrismaClientUnknownRequestError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientUnknownRequestError' );

            } else if( error instanceof PrismaClientRustPanicError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientRustPanicError' );

            } else if( error instanceof PrismaClientInitializationError ) {
                const { errorCode, message, clientVersion } = error;

                throw new PrismaError( errorCode, '', message, clientVersion, 'PrismaClientInitializationError' );

            } else if( error instanceof PrismaClientValidationError ) {
                const { message, clientVersion } = error;

                throw new PrismaError( '', '', message, clientVersion, 'PrismaClientValidationError' );

            } else {
                throw new Error( error );

            }

        }
        
    }

}

module.exports = new PrismaUserRepository();