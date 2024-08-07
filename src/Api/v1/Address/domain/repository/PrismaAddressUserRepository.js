const AddressUserRepository = require('./AddressUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaAddressUserRepository extends AddressUserRepository {

    async createAddressUser ( prismaSQL, street, city, state, zip_code, country, uuid_user ) {

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
    }

    async deleteAddressUserAdmin ( prismaSQL, uuid_address_user ) {
        return await prismaSQL.tbl_address_user.delete({
            where:{
                uuid_address_user
            }
        });
    }

    async deleteAddressUser ( prismaSQL, uuid_address_user ) {
        return await prismaSQL.tbl_address_user.update({
            data:{
                active:false,
            },
            where:{
                uuid_address_user
            }
        });
    }

    async updateAddressUser ( prismaSQL, uuid_address_user, street, city, state, zip_code, country, uuid_user  ) {

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
    }

    async getAddressUserPagination ( page, size, orderBy, filter ) {
        const [ data, total ] = await Promise.all([
            prisma.tbl_address_user.findMany({
                skip: page,
                take: size,
                orderBy: orderBy,
                where: filter
            }),
            prisma.tbl_address_user.count({
                filter
            }),
          ]);

        return [ data, total ];
    }

    async getAddressUserByUuid ( uuid_address_user ) {
        return await prisma.tbl_address_user.findUnique({
            where:{
                uuid_address_user
            }
        });
    }

}

module.exports = new PrismaAddressUserRepository();