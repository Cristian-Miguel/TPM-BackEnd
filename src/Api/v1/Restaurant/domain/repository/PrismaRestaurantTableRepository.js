const RestaurantTableRepository = require( './RestaurantTableRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { join } = require('@prisma/client/runtime/library');

class PrismaRestaurantTableRepository extends RestaurantTableRepository {

    async createTable( prismaSQL, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved ) {
        const id_restaurant = await prisma.tbl_restaurant.findUnique({
            select:{
                id_restaurant: true
            },
            where:{
                uuid_restaurant
            }
        });

        return await prismaSQL.tbl_restaurant_table.create({
            data:{
                number_people,
                cost,
                date_reservation: date_reservation === null ? new Date().toISOString() : date_reservation,
                type_reservation,
                discount_cash: discount_cash === null ? 0.0 : discount_cash,
                discount_percentage: discount_percentage === null ? 0.0 : discount_percentage,
                reserved,
                id_restaurant
            }
        });

    }

    async createTables( prismaSQL, tables ) {

        return await prismaSQL.tbl_restaurant_table.createMany({
            data: tables,
            skipDuplicates: true,
        });
    }

    async updateTable( prismaSQL, id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved ) {

        return await prismaSQL.tbl_restaurant_table.update({
            data:{
                number_people,
                cost,
                date_reservation: date_reservation === null ? new Date().toISOString() : date_reservation,
                type_reservation,
                discount_cash: discount_cash === null ? 0.0 : discount_cash,
                discount_percentage: discount_percentage === null ? 0.0 : discount_percentage,
                reserved,
                id_restaurant
            },
            where:{
                id_restaurant_table
            }
        });
    }

    async deleteTable( prismaSQL, id_restaurant_table ){
        return await prismaSQL.tbl_restaurant_table.delete({
            where:{
                id_restaurant_table
            }
        });
    }

    async deleteTables( prismaSQL, listIds ){
        return await prismaSQL.tbl_restaurant_table.deleteMany({
            where:{
                id_restaurant:{
                    in: listIds
                }
            }
        });
    }

    async getTableById( id_restaurant_table ) {
        return await prisma.tbl_restaurant_table.findUnique({
            where:{
                id_restaurant_table
            }
        }); 
    }

    async getTablesByRestaurant( uuid_restaurant ){
        const id_restaurant = await prisma.tbl_restaurant.findUnique({
            select:{
                id_restaurant: true
            },
            where:{
                uuid_restaurant
            }
        });

        return await prisma.tbl_restaurant_table.findUnique({
            where:{
                id_restaurant
            }
        }); 
    }

    async getTablesPagination( page, size, orderBy, filter ){
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

module.exports = new PrismaRestaurantTableRepository();