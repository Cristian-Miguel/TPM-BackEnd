const AddressUserRepository = require('./AddressUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaErrorHandler = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaAddressUserRepository extends AddressUserRepository {

    async createAddressUser ( prismaSQL, street, city, state, zip_code, country, id_user ) {

        try {
            const now = new Date().toISOString();

            return await prismaSQL.tbl_address_user.create({
                data:{
                    street,
                    city,
                    state,
                    zip_code,
                    country,
                    id_user,
                    date_created: now,
                    last_update: now,
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
        
    }

    async deleteAddressUserAsAdmin ( prismaSQL, uuid_address_user ) {

        try {
            return await prismaSQL.tbl_address_user.delete({
                where:{
                    uuid_address_user
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }

    }

    async deleteAddressUserAsUser ( prismaSQL, uuid_address_user ) {

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
            PrismaErrorHandler.handleError(error);
        }
    }

    async updateAddressUser ( prismaSQL, uuid_address_user, street, city, state, zip_code, country, uuid_user  ) {

        try {
            const user = await prisma.tbl_user.findUnique({
                select:{
                    id_user: true
                },
                where:{
                    uuid_user
                }
            });

            const id_user = user.id_user;

            return await prismaSQL.tbl_address_user.update({
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
            PrismaErrorHandler.handleError(error);

        }

    }

    async getAddressUserPagination ( skip, take, orderBy, filter ) {

        try {

            const [ data, total ] = await Promise.all([
                prisma.tbl_address_user.findMany({
                    skip,
                    take,
                    orderBy: orderBy,
                    where: filter
                }),
                prisma.tbl_address_user.count({
                    where: filter
                }),
            ]);

            return [ data, total ];

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

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
            PrismaErrorHandler.handleError(error);

        }

    }

}

module.exports = new PrismaAddressUserRepository();