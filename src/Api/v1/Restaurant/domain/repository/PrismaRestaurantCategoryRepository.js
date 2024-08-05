const RestaurantCategoryRepository = require( './RestaurantCategoryRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaRestaurantCategoryRepository extends RestaurantCategoryRepository {
    
    async createCategory ( prismaSQL, description ) {
        return await prismaSQL.tbl_restaurant_category.create({
            data:{
                description
            }
        });
    }

    async updateCategory ( prismaSQL, id_restaurant_category, description ) {
        return await prismaSQL.tbl_restaurant_category.update({
            data:{
                description
            },
            where:{
                id_restaurant_category
            }
        });
    }

    async deleteCategory( prismaSQL, id_restaurant_category ) {
        return await prismaSQL.tbl_restaurant_category.delete({
            where: {
                id_restaurant_category
            }
        });
    }

    async getCategoryById ( id_restaurant_category ) {
        return await prisma.tbl_restaurant.findUnique({
            where:{
                id_restaurant_category
            }
        });
    }

    async getCategoryPagination ( page, size, orderBy, filter ) {
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

module.exports = new PrismaRestaurantCategoryRepository();