const AddressServiceRepository = require( './AddressServiceRepository' );

class PrismaAddressServiceRepository extends AddressServiceRepository {
    async createAddressService ( prismaSQL, street, city, state, zip_code, country, id_service ) {
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
    }

    async deleteAsAdminAddressService ( prismaSQL, uuid_address_service ) {
        return await prismaSQL.tbl_address_service.delete({
            where:{
                uuid_address_service
            }
        });
    }

    async deleteAsUserAddressService ( prismaSQL, uuid_address_service ) {
        return await prismaSQL.tbl_address_service.update({
            data:{
                active:false,
            },
            where:{
                uuid_address_service
            }
        });
    }

    async updateAddressService ( prismaSQL, uuid_address_service, street, city, state, zip_code, country, id_service ) {
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
    }

    async getAddressService ( page, size, orderBy, filter ) {
        const [ data, total ] = await Promise.all([
            prisma.tbl_address_service.findMany({
                skip: page,
                take: size,
                orderBy: orderBy,
                where: filter
            }),
            prisma.tbl_user.count({
                filter
            }),
          ]);

        return [ data, total ];
    }

    async getAddressServiceByUuid ( uuid_address_service ) {
        return await prisma.tbl_address_service.findUnique({
            where:{
                uuid_address_service
            }
        });
    }
}

module.exports = new PrismaAddressServiceRepository();