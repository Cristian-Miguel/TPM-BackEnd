const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class HotelRoomService {
    constructor( HotelRoomRepository ) {
        this.HotelRoomRepository = HotelRoomRepository;
    }

    async createHotelRoom ({ id_room_category, number_room, uuid_hotel }) {

        const id_hotel = prisma.tbl_hotel.findUnique({
            select:{
                id_hotel: true
            },
            where:{
                uuid_hotel
            }
        });

        const result = await prisma.$transaction(async (prisma) => {
            return this.HotelRoomRepository.createHotelRoom( id_room_category, number_room, id_hotel );
        });

        return result;
    }

    async createManyHotelRoom({ rooms }) {
        const result = await prisma.$transaction(async (prisma) => {
            return this.HotelRoomRepository.createManyHotelRoom ( rooms );
        });

        return result;
    }

    async deleteRoomHotel ({ id_hotel_room }) {
        const result = await prisma.$transaction(async (prisma) => {
            return this.HotelRoomRepository.deleteRoomHotel( id_hotel_room );
        });

        return result;
    }

    async updateRoomHotel ({ id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user }) {
        const result = await prisma.$transaction(async (prisma) => {
            return this.HotelRoomRepository.updateRoomHotel( id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user );
        });

        return result;
    }

    async getRoomHotelPagination ({ page, size, orderBy, filter }) {
        return this.HotelRoomRepository.getRoomHotelPagination ( page, size, orderBy, filter );
    }

    async getRoomHotelById ({ id_hotel_room }) {
        return this.HotelRoomRepository.getRoomHotelById ( id_hotel_room );
    }
}

module.exports = HotelRoomService;