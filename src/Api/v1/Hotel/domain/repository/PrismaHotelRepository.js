const HotelRepository = require( './HotelRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError } = require('@prisma/client');
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaHotelRepository extends HotelRepository {
    
    async createHotel ( prismaSQL, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {

        try {
            return await prismaSQL.tbl_hotel.create({
                data:{
                    name: name,
                    descrition: descrition,
                    main_image: main_image,
                    id_category: id_category,
                    id_user: id_user,
                    phone_number: phone_number,
                    email: email,
                    website: website,
                    open_hour: open_hour,
                    close_hour: close_hour,
                    rating: 0.00,
                    date_created: new Date().toISOString(),
                    last_update: new Date().toISOString()
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

    async deleteHotelAdmin ( prismaSQL, uuid ) {

        try {
            return await prismaSQL.tbl_hotel.delete({
                where:{
                    uuid_hotel: uuid
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

    async deleteHotelSeller( prismaSQL, uuid ) {

        try {
            return prismaSQL.tbl_hotel.update({
                data:{
                    active: false
                },
                where: {
                    uuid_hotel: uuid
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

    async updateHotel ( prismaSQL, uuid, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {

        try {
            return await prismaSQL.tbl_hotel.update({
                data:{
                    name: name,
                    descrition: descrition,
                    main_image: main_image,
                    id_category: id_category,
                    id_user: id_user,
                    phone_number: phone_number,
                    email: email,
                    website: website,
                    open_hour: open_hour,
                    close_hour: close_hour,
                    rating: 0.00,
                    date_created: new Date().toISOString(),
                    last_update: new Date().toISOString()
                }, 
                where:{
                    uuid_hotel: uuid
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

    async getHotelPagination ( skip, take, orderBy, filter ) {

        try {

            const [ data, total ] = await Promise.all([
                prisma.tbl_hotel.findMany({
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

    async getHotelByUuid ( uuid ) {

        try {
            return await prisma.tbl_hotel.findUnique({
                where:{
                    uuid_hotel: uuid
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

module.exports = PrismaHotelRepository;