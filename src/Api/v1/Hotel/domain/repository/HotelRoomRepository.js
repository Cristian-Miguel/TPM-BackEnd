
class HotelRoomRepository {

    async createRoomHotel ( id_room_category, number_room, id_hotel ) {
        throw new Error('Method not implemented.');
    }

    async createManyRoomHotel ( rooms ) {
        throw new Error('Method not implemented.');
    }

    async deleteRoomHotel ( id ) {
        throw new Error('Method not implemented.');
    }

    async updateRoomHotel ( id_hotel_room, id_room_category, number_room, id_hotel, active, uuid_user ) {
        throw new Error('Method not implemented.');
    }

    async getRoomHotelPagination ( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getRoomHotelById ( id ) {
        throw new Error('Method not implemented.');
    }
}

module.exports = HotelRoomRepository;