const AddressUserRepository = require('./AddressUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError } = require('@prisma/client');
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaAddressUserRepository extends AddressUserRepository {

    async createAddressUser ( prismaSQL, street, city, state, zip_code, country, uuid_user ) {

        try {
            const id_user = prismaSQL.tbl_user.findUnique({
                select:{
                    id_user: true
                },
                where:{
                    uuid_user: uuid_user
                }
            });

            return await prismaSQL.tbl_address_user.create({
                data:{
                    street,
                    city,
                    state,
                    zip_code,
                    country,
                    id_user,
                    date_created: new Date().toISOString(),
                    last_update: new Date().toISOString(),
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

    async deleteAddressUserAdmin ( prismaSQL, uuid_address_user ) {

        try {
            return await prismaSQL.tbl_address_user.delete({
                where:{
                    uuid_address_user
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

    async deleteAddressUser ( prismaSQL, uuid_address_user ) {

        try {
            return await prismaSQL.tbl_address_user.update({
                data:{
                    active:false,
                },
                where:{
                    uuid_address_user
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

    async updateAddressUser ( prismaSQL, uuid_address_user, street, city, state, zip_code, country, uuid_user  ) {

        try {
            const id_user = prismaSQL.tbl_user.findUnique({
                select:{
                    id_user: true
                },
                where:{
                    uuid_user: uuid_user
                }
            });

            return await prismaSQL.tbl_address_user.create({
                data:{
                    street,
                    city,
                    state,
                    zip_code,
                    country,
                    id_user,
                    last_update: new Date().toISOString()
                },
                where:{
                    uuid_address_user
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

    async getAddressUserPagination ( page, size, orderBy, filter ) {

        try {
            const skip = ( page - 1 ) * size;

            const [ data, total ] = await Promise.all([
                prisma.tbl_address_user.findMany({
                    skip,
                    take,
                    orderBy: orderBy,
                    where: filter
                }),
                prisma.tbl_address_user.count({
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

    async getAddressUserByUuid ( uuid_address_user ) {

        try {
            return await prisma.tbl_address_user.findUnique({
                where:{
                    uuid_address_user
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

}

module.exports = new PrismaAddressUserRepository();