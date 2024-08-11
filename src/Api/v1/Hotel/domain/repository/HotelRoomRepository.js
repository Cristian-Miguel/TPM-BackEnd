
class HotelRoomRepository {

    async createRoomHotel ( prismaSQL, id_room_category, number_room, id_hotel ) {
        throw new Error('Method not implemented.');
    }

    async createManyRoomHotel ( prismaSQL, rooms ) {
        throw new Error('Method not implemented.');
    }

    async deleteRoomHotel ( prismaSQL, id_hotel_room ) {
        throw new Error('Method not implemented.');
    }

    async updateRoomHotel ( prismaSQL, id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user ) {
        throw new Error('Method not implemented.');
    }

    async getRoomHotelPagination ( skip, take, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getRoomHotelById ( id ) {
        throw new Error('Method not implemented.');
    }
}

module.exports = HotelRoomRepository;