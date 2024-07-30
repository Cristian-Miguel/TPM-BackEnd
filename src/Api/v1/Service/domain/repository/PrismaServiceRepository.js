const ServiceRepository = require( './ServiceRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaServiceRepository extends ServiceRepository {
    async createService ( service_type, id_relation_product ) {
        return prisma.tbl_service.create({
            data:{
                service_type,
                id_relation_product
            }
        });
    }

    async deleteServiceAsAdmin( id_relation_product ) {
        return prisma.tbl_service.delete({
            where:{
                id_relation_product
            }
        });
    }

    async deleteServiceAsSeller( id_relation_product ) {
        return prisma.tbl_service.update({
            data:{
                active: false
            },
            where:{
                id_relation_product
            }
        });
    }

    async updateService( service_type, id_relation_product ){
        return prisma.tbl_service.update({
            data:{
                service_type
            },
            where:{
                id_relation_product
            }
        });
    }

    async getServiceByService( service_type ){
        return prisma.tbl_service.findMany({
            where:{
                service_type
            }
        });
    }

    async getServiceByUuid( id_relation_product ){
        return prisma.tbl_service.findUnique({
            where:{
                id_relation_product
            }
        });
    }

    async getServicePagination( page, size, orderBy, filter ){
        const skip = ( page - 1 ) * size;

        const [ data, total ] = await Promise.all([
            prisma.tbl_service.findMany({
                skip: skip,
                take: size,
                orderBy: orderBy,
                where: filter
            }),
            prisma.tbl_service.count({
                filter
            }),
          ]);

        return [ data, total ];
    }
}

module.exports = new PrismaServiceRepository();