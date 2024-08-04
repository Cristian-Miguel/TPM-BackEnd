const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class HotelService {

    constructor( HotelRepository, ServiceRespository, AddressServiceRepository ){
        this.HotelRepository = HotelRepository;
        this.ServiceRespository = ServiceRespository;
        this.AddressServiceRepository = AddressServiceRepository;
    }

    async createHotel ({ name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour,
        street, city, state, zip_code, country
     }) {
        
        const result = await prisma.$transaction(async (prisma) => {
            const service = await this.ServiceRepository.createService( prisma, 'HOTEL' );

            const hotel = await this.HotelService.createHotel
                ( prisma, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour );
            
            const addressService = await this.AddressServiceRepository
                .createAddressService( prisma, street, city, state, zip_code, country, service.id_service );

            return hotel;
        });

        return result;
    }

    async deleteHotelAdmin ({ uuid }) {

        const result = await prisma.$transaction(async (prisma) => {
            return await this.HotelService.deleteHotelAdmin ( prisma, uuid );
        });

        return result;
    }

    async deleteHotelSeller ({ uuid }) {

        const result = await prisma.$transaction(async (prisma) => {
            return await this.HotelService.deleteHotelSeller( prisma, uuid );
        });

        return result;
    }

    async updateHotel ({ uuid_hotel, name, descrition, main_image, id_category, uuid_user, phone_number, email, website, open_hour, close_hour,
        street, city, state, zip_code, country
     }) {
        const id_service = await prisma.tbl_service.findUnique({
            where:{
                id_relation_product: uuid_hotel
            }
        });

        const result = await prisma.$transaction(async (prisma) => {
            const hotel = await this.HotelService.updateHotel
                ( prisma, uuid_hotel, name, descrition, main_image, id_category, uuid_user, phone_number, email, website, open_hour, close_hour );

            const addressService = await this.AddressServiceRepository.updateAddressService( prisma, street, city, state, zip_code, country, id_service );

            return hotel;
        });

        return result;
    }

    async getHotelPagination ({ page, size, orderBy, filter }) {
        return await this.HotelService.getHotelPagination ( page, size, orderBy, filter );
    }

    async getHotelByUuid ({ uuid }) {
        return await this.HotelService.getHotelByUuid ( uuid );
    }
}

module.exports = HotelService;