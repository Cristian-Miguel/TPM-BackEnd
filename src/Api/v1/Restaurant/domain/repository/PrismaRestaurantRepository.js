const RestaurantRepository = require("./RestaurantRepository");
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaRestaurantRepository extends RestaurantRepository {
    async createRestaurant ( prismaSQL, uuid_restaurant, name, descripcion, main_image, uuid_user, id_restaurant_category, 
        email, phone_number, webside, open_hour, close_hour ) {
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
    }

    async updateRestaurant ( prismaSQL, uuid_restaurant, name, descripcion, main_image, uuid_user, 
        id_restaurant_category, email, phone_number, webside, open_hour, close_hour ) {
        const last_update = new Date().toISOString();

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
    }

    async deleteAsSeller ( prismaSQL, uuid_restaurant ) {
        return await prismaSQL.tbl_restaurant.update({
            data:{
                active
            },
            where:{
                uuid_restaurant
            }
        });
    }

    async deleteAsAdmin ( prismaSQL, uuid_restaurant ) {
        return await prismaSQL.tbl_restaurant.delete({
            where:{
                uuid_restaurant
            }
        });
    }

    async getRestaurantByUuid ( uuid_restaurant ) {
        return await prisma.tbl_restaurant.findUnique({
            where:{
                uuid_restaurant
            }
        });
    }

    async getRestaurantPagination( page, size, orderBy, filter ) {
        const skip = ( page - 1 ) * size;

        const [ data, total ] = await Promise.all([
            prisma.tbl_restaurant.findMany({
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

module.exports = new PrismaRestaurantRepository();