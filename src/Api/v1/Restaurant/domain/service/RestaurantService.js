const prisma = require("../../../Shared/domain/database/PrismaCliente");

class RestaurantService {

    constructor( RestaurantRepository, ServiceRepository, AddressServiceRepository ) {
        this.RestaurantRepository = RestaurantRepository;
        this.ServiceRepository = ServiceRepository;
        this.AddressServiceRepository = AddressServiceRepository;
    }

    async createRestaurant ({ name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, 
        open_hour, close_hour, street, city, state, zip_code, country }) {
        
        const result = await prisma.$transaction( async (prisma) => {

            const service = await this.ServiceRepository.createService( prisma, 'RESTAURANT' );

            const restaurant = await this.RestaurantRepository.createRestaurant( prisma, service.id_relation_product,
                name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour );

            const addressService = await this.AddressServiceRepository.createAddressService( prisma, street, city, state, zip_code, country, service.id_service );

            return  restaurant;
        });

        return result;
    }

    async updateRestaurant ({ uuid_restaurant, name, descripcion, main_image, id_user, id_restaurant_category, email,
        phone_number, webside, open_hour, close_hour, street, city, state, zip_code, country }) {
        const id_service = await prisma.tbl_service.findUnique({
            where:{
                id_relation_product: uuid_restaurant
            }
        });

        const result = await prisma.$transaction( async (prisma) => {

            const restaurant = await this.RestaurantRepository.updateRestaurant( prisma, uuid_restaurant,
                name, descripcion, main_image, id_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour );

            const addressService = await this.AddressServiceRepository.updateAddressService( prisma, street, city, state, zip_code, country, id_service );

            return restaurant;

        });

        return result;
    }

    async deleteAsSeller ({ uuid_restaurant }) {
        const result = await prisma.$transaction( async (prisma) => {

            return await this.RestaurantRepository.deleteAsSeller( prisma, uuid_restaurant );

        });

        return result;
    }

    async deleteAsAdmin ({ uuid_restaurant }) {
        const result = await prisma.$transaction( async (prisma) => {
            const restaurant = await this.RestaurantRepository.deleteAsAdmin( prisma, uuid_restaurant );

            const service = await this.ServiceRepository.deleteAsAdmin( prisma, uuid_restaurant );

            return restaurant;
        });

        return result;
    }

    async getRestaurantByUuid ({ uuid_restaurant }) {
        return await this.RestaurantRepository.getRestaurantByUuid( uuid_restaurant );
    }

    async getRestaurantPagination({ page, size, orderBy, filter }) {
        return await this.RestaurantRepository.getRestaurantPagination( page, size, orderBy, filter );
    }

}

module.exports = RestaurantService;