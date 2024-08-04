const ServiceRepository = require( './ServiceRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaServiceRepository extends ServiceRepository {
    async createService ( prismaSQL, service_type ) {
        return await prismaSQL.tbl_service.create({
            data:{
                service_type
            }
        });
    }

    async deleteServiceAsAdmin( prismaSQL, id_relation_product ) {
        return await prismaSQL.tbl_service.delete({
            where:{
                id_relation_product
            }
        });
    }

    async updateService( prismaSQL, service_type, id_relation_product ){
        return await prismaSQL.tbl_service.update({
            data:{
                service_type
            },
            where:{
                id_relation_product
            }
        });
    }

    async getServiceByService( service_type ){
        const active = true;
        
        return await prisma.tbl_service.findMany({
            where:{
                service_type,
                active
            }
        });
    }

    async getServiceByUuid( id_relation_product ){
        const active = true;
        
        return prisma.tbl_service.findUnique({
            where:{
                id_relation_product,
                active
            }
        });
    }

    async getServicePagination( page, size, orderBy, filter ){
        const skip = ( page - 1 ) * size;

        const [ data, total ] = await Promise.all([
            prisma.tbl_service.findMany({
                relationLoadStrategy: 'join',
                include: {
                    tbl_hotel: true,
                    tbl_restaurant: true,
                    tbl_tour: true,
                    tbl_trip: true,
                    tbl_package: true,
                },
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