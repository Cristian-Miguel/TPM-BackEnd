
class RoomCategoryRepository {
    //Hotel Room Category
    async createCategoryRoomHotel ( description, number_beds, max_people, cost, discount_cash, discount_percentage ) {
        throw new Error('Method not implemented.');
    }

    async deleteCategoryRoomHotel ( id_hotel_room_category ) {
        throw new Error('Method not implemented.');
    }

    async updateCategoryRoomHotel ( id_hotel_room_category, description, number_beds, max_people, cost, discount_cash, discount_percentage ) {
        throw new Error('Method not implemented.');
    }

    async getCategoryRoomHotelPagination ( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getCategoryRoomHotel ( id_hotel_room_category ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = RoomCategoryRepository;