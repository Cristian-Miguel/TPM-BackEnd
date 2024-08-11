const RestaurantRepository = require("./RestaurantRepository");
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError, 
        PrismaClientInitializationError, PrismaClientValidationError } = require('@prisma/client');
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaRestaurantRepository extends RestaurantRepository {
    async createRestaurant ( prismaSQL, uuid_restaurant, name, descripcion, main_image, uuid_user, id_restaurant_category, 
        email, phone_number, webside, open_hour, close_hour ) {
        
        try {
            const date_created = new Date().toISOString();
            const last_update = new Date().toISOString();
            const active = true;

            const id_user = prisma.tbl_user.findUnique({
                select:{
                    id_user
                },
                where:{
                    uuid_user
                }
            });

            return await prismaSQL.tbl_restaurant.create({
                data:{
                    uuid_restaurant,
                    name,
                    descripcion,
                    main_image,
                    id_user,
                    id_restaurant_category,
                    email,
                    phone_number,
                    webside,
                    open_hour,
                    close_hour,
                    date_created,
                    last_update,
                    active
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

    async updateRestaurant ( prismaSQL, uuid_restaurant, name, descripcion, main_image, uuid_user, 
        id_restaurant_category, email, phone_number, webside, open_hour, close_hour ) {
        const last_update = new Date().toISOString();

        try {
            const id_user = prisma.tbl_user.findUnique({
                select:{
                    id_user
                },
                where:{
                    uuid_user
                }
            });

            return await prismaSQL.tbl_restaurant.update({
                data:{
                    name,
                    descripcion,
                    main_image,
                    id_user,
                    id_restaurant_category,
                    email,
                    phone_number,
                    webside,
                    open_hour,
                    close_hour,
                    last_update
                },
                where:{
                    uuid_restaurant
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

    async deleteAsSeller ( prismaSQL, uuid_restaurant ) {

        try {
            return await prismaSQL.tbl_restaurant.update({
                data:{
                    active
                },
                where:{
                    uuid_restaurant
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

    async deleteAsAdmin ( prismaSQL, uuid_restaurant ) {

        try {
            return await prismaSQL.tbl_restaurant.delete({
                where:{
                    uuid_restaurant
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

    async getRestaurantByUuid ( uuid_restaurant ) {

        try {
            return await prisma.tbl_restaurant.findUnique({
                where:{
                    uuid_restaurant
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

    async getRestaurantPagination( skip, take, orderBy, filter ) {

        try {

            const [ data, total ] = await Promise.all([
                prisma.tbl_restaurant.findMany({
                    skip,
                    take,
                    orderBy: orderBy,
                    where: filter
                }),
                prisma.tbl_service.count({
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

module.exports = new PrismaRestaurantRepository();