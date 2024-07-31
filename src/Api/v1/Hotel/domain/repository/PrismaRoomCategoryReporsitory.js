const RoomCategoryRepository = require( './RoomCategoryRepository' );
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaRoomCategoryRepository extends RoomCategoryRepository  {

    async createCategoryRoomHotel ( prismaSQL, description, number_beds, max_people, cost, discount_cash, discount_percentage ) {
        return await prismaSQL.tbl_hotel_room_category.create({
            data:{
                description,
                number_beds,
                max_people,
                cost,
                discount_cash,
                discount_percentage
            }
        });
    }

    async deleteCategoryRoomHotel ( prismaSQL, id_hotel_room_category ) {
        return await prismaSQL.tbl_hotel_room_category.delete({
            where:{
                id_hotel_room_category
            }
        });
    }

    async updateCategoryRoomHotel ( prismaSQL, id_hotel_room_category, description, number_beds, max_people, cost, discount_cash, discount_percentage ) {
        return await prismaSQL.tbl_hotel_room_category.create({
            data:{
                description,
                number_beds,
                max_people,
                cost,
                discount_cash,
                discount_percentage
            },
            where:{
                id_hotel_room_category
            }
        });
    }

    async getCategoryRoomHotelPagination ( page, size, orderBy, filter ) {
        const [ data, total ] = await Promise.all([
            prisma.tbl_hotel_room_category.findMany({
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

    async getCategoryRoomHotel ( id_hotel_room_category ) {
        return await prisma.tbl_hotel_room_category.findUnique({
            where:{
                id_hotel_room_category
            }
        });
    }

}

module.exports = PrismaRoomCategoryRepository;