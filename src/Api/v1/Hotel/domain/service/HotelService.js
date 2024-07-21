const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class HotelService {

    constructor( HotelRepository ){
        this.HotelRepository = HotelRepository;
    }

    async createHotel ({ name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour }) {
        
        const result = await prisma.$transaction(async (prisma) => {
            return HotelService.createHotel
                ( name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour );
        });

        return result;
    }

    async deleteHotelAdmin ({ uuid }) {

        const result = await prisma.$transaction(async (prisma) => {
            return HotelService.deleteHotelAdmin ( uuid );
        });

        return result;
    }

    async deleteHotelSeller ({ uuid }) {

        const result = await prisma.$transaction(async (prisma) => {
            return HotelService.deleteHotelSeller( uuid );
        });

        return result;
    }

    async updateHotel ({ uuid_hotel, name, descrition, main_image, id_category, uuid_user, phone_number, email, website, open_hour, close_hour }) {
        
        const result = await prisma.$transaction(async (prisma) => {
            return HotelService.updateHotel
                ( uuid_hotel, name, descrition, main_image, id_category, uuid_user, phone_number, email, website, open_hour, close_hour )
        });

        return result;
    }

    async getHotelPagination ({ page, size, orderBy, filter }) {
        return HotelService.getHotelPagination ( page, size, orderBy, filter );
    }

    async getHotelByUuid ({ uuid }) {
        return HotelService.getHotelByUuid ( uuid );
    }
}

module.exports = HotelService;