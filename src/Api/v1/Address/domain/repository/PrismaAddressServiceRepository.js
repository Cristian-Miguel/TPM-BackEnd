const AddressServiceRepository = require( './AddressServiceRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaErrorHandler = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaAddressServiceRepository extends AddressServiceRepository {

    async createAddressService ( prismaSQL, street, city, state, zip_code, country, id_service ) {

        try {
            return await prismaSQL.tbl_address_service.create({
                data:{
                    street,
                    city,
                    state,
                    zip_code,
                    country,
                    id_service,
                    date_created: new Date().toISOString(),
                    last_update: new Date().toISOString(),
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
    
    }

    async deleteAddressServiceAsAdmin ( prismaSQL, uuid_address_service ) {

        try {
            return await prismaSQL.tbl_address_service.delete({
                where:{
                    uuid_address_service
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
        
    }

    async deleteAddressServiceAsUser ( prismaSQL, uuid_address_service ) {

        try {
            return await prismaSQL.tbl_address_service.update({
                data:{
                    active:false,
                },
                where:{
                    uuid_address_service
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
        
    }

    async updateAddressService ( prismaSQL, uuid_address_service, street, city, state, zip_code, country, id_service ) {

        try {
            return await prismaSQL.tbl_address_service.create({
                data:{
                    street,
                    city,
                    state,
                    zip_code,
                    country,
                    id_service,
                    last_update: new Date().toISOString()
                },
                where:{
                    uuid_address_service
                }
            });
        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
        
    }

    async getAddressServicePagination ( skip, take, orderBy, filter ) {

        try {
            const [ data, total ] = await Promise.all([
                prisma.tbl_address_service.findMany({
                    skip,
                    take,
                    orderBy: orderBy,
                    where: filter
                }),
                prisma.tbl_user.count({
                    where: filter
                }),
            ]);

            return [ data, total ];

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
        
    }

    async getAddressServiceByUuid ( uuid_address_service ) {
        
        try {
            return await prisma.tbl_address_service.findUnique({
                where:{
                    uuid_address_service
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError(error);

        }
        
    }

}

module.exports = new PrismaAddressServiceRepository();