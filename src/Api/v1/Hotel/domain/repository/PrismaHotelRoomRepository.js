const HotelRoomRepository = require("./HotelRoomRepository");
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, PrismaClientInitializationError, PrismaClientValidationError } = require('@prisma/client');
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaHotelRoomRepository extends HotelRoomRepository {
    
    async createRoomHotel ( prismaSQL, id_room_category, number_room, id_hotel ) {

        try {
            return prismaSQL.tbl_hotel_room.create({
                data:{
                    id_room_category,
                    number_room,
                    id_hotel
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

    async createManyRoomHotel ( prismaSQL, rooms ) {

        try {
            return prismaSQL.tbl_hotel_room.createMany({
                data: rooms,
                skipDuplicates: true
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

    async deleteRoomHotel ( prismaSQL, id_hotel_room ) {

        try {
            return prismaSQL.tbl_hotel_room.delete({
                data:{
                    id_room_category,
                    number_room,
                    id_hotel
                },
                where: {
                    id_hotel_room
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

    async updateRoomHotel ( prismaSQL, id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user ) {

        try {
            return prismaSQL.tbl_hotel_room.update({
                data:{
                    id_room_category,
                    number_room,
                    id_hotel,
                    uuid_user,
                    active
                },
                where: {
                    id_hotel_room
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

    async getRoomHotelPagination ( skip, take, orderBy, filter ) {

        try {
            const [ data, total ] = await Promise.all([
                prisma.tbl_hotel_room.findMany({
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

    async getRoomHotelById ( id ) {

        try {
            return prisma.tbl_hotel_room.findUnique({
                where: {
                    id_hotel_room: id
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

module.exports = PrismaHotelRoomRepository;