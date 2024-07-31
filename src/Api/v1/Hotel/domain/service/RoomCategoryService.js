const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class RoomCategoryService {

    constructor( RoomCategoryRepository ) {
        this.RoomCategoryRepository = RoomCategoryRepository;
    }

    async createRoomCategory ({ description, number_beds, max_people, cost, discount_cash, discount_percentage }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.RoomCategoryRepository.createRoomCategory( prisma, description, number_beds, max_people, cost, discount_cash, discount_percentage );
        });

        return result;
    }

    async deleteRoomCategory ({ id_hotel_room_category }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.RoomCategoryRepository.deleteRoomCategory( prisma, id_hotel_room_category );
        });

        return result;
    }

    async updateRoomCategory ({ id_hotel_room_category, description, number_beds, max_people, cost, discount_cash, discount_percentage }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.RoomCategoryRepository
                .updateRoomCategory( prisma, id_hotel_room_category, description, number_beds, max_people, cost, discount_cash, discount_percentage );
        });

        return result;
    }

    async getRoomCategoryPagination ({ page, size, orderBy, filter }) {
        return await this.RoomCategoryRepository.getRoomCategoryById( page, size, orderBy, filter );
    }

    async getRoomCategoryById({ id_hotel_room_category }){
        return await this.RoomCategoryRepository.getRoomCategoryById( id_hotel_room_category );
    }

}

module.exports = RoomCategoryService;