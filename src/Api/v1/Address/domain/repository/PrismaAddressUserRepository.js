const AddressUserRepository = require('./AddressUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaAddressUserRepository extends AddressUserRepository {

    async createAddressUser ( street, city, state, postal_code, country, uuid_user ) {

        const id_user = prisma.tbl_user.findUnique({
            select:{
                id_user: true
            },
            where:{
                uuid_user: uuid_user
            }
        });

        return await prisma.tbl_address_user.create({
            data:{
                street,
                city,
                state,
                postal_code,
                country,
                id_user,
                date_created: new Date().toISOString(),
                last_update: new Date().toISOString(),
            }
        });
    }

    async deleteAddressUserAdmin ( uuid_address_user ) {
        return await prisma.tbl_address_user.delete({
            where:{
                uuid_address_user
            }
        });
    }

    async deleteAddressUser ( uuid_address_user ) {
        return await prisma.tbl_address_user.update({
            data:{
                active:false,
            },
            where:{
                uuid_address_user
            }
        });
    }

    async updateAddressUser ( uuid_address_user,  street, city, state, postal_code, country, uuid_user  ) {

        const id_user = prisma.tbl_user.findUnique({
            select:{
                id_user: true
            },
            where:{
                uuid_user: uuid_user
            }
        });

        return await prisma.tbl_address_user.create({
            data:{
                street,
                city,
                state,
                postal_code,
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