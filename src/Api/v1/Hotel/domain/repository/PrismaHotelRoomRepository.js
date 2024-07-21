const HotelRoomRepository = require("./HotelRoomRepository");
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaHotelRoomRepository extends HotelRoomRepository{
    
    async createRoomHotel ( id_room_category, number_room, id_hotel ) {
        return prisma.tbl_hotel_room.create({
            data:{
                id_room_category,
                number_room,
                id_hotel
            }
        });
    }

    async createManyRoomHotel ( rooms ) {
        return prisma.tbl_hotel_room.createMany({
            data: rooms,
            skipDuplicates: true
        });
    }

    async deleteRoomHotel ( id ) {
        return prisma.tbl_hotel_room.delete({
            data:{
                id_room_category,
                number_room,
                id_hotel
            },
            where: {
                id_hotel_room: id
            }
        });
    }

    async updateRoomHotel ( id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user ) {
        return prisma.tbl_hotel_room.update({
            data:{
                id_room_category,
                number_room,
                id_hotel,
                uuid_user,
                active
            },
            where: {
                id_hotel_room
            }
        });
    }

    async getRoomHotelPagination ( page, size, orderBy, filter ) {
        const [ data, total ] = await Promise.all([
            prisma.tbl_hotel_room.findMany({
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

    async getRoomHotelById ( id ) {
        return prisma.tbl_hotel_room.findUnique({
            where: {
                id_hotel_room: id
            }
        });
    }
}

module.exports = PrismaHotelRoomRepository;