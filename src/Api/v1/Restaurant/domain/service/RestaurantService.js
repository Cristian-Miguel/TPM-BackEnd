const prisma = require("../../../Shared/domain/database/PrismaCliente");

class RestaurantService {

    constructor( RestaurantRepository, ServiceRepository ) {
        this.RestaurantRepository = RestaurantRepository;
        this.ServiceRepository = ServiceRepository;
    }

    async createRestaurant ( name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour ) {
        
        const result = await prisma.$transaction( async (prisma) => {

            const service = await this.ServiceRepository.createService( prisma, 'RESTAURANT' );

            const restaurant = await this.RestaurantRepository.createRestaurant( prisma, service.id_relation_product,
                name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour );

            return  restaurant;
        });

        return result;
    }

    async updateRestaurant ( uuid_restaurant, name, descripcion, main_image, id_user, 
        id_restaurant_category, email, phone_number, webside, open_hour, close_hour ) {
        const result = await prisma.$transaction( async (prisma) => {

            return await this.RestaurantRepository.updateRestaurant( prisma, uuid_restaurant,
                name, descripcion, main_image, id_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour );

            });

        return result;
    }

    async deleteAsSeller ( uuid_restaurant ) {
        const result = await prisma.$transaction( async (prisma) => {

            return await this.RestaurantRepository.deleteAsSeller( prisma, uuid_restaurant );

        });

        return result;
    }

    async deleteAsAdmin ( uuid_restaurant ) {
        const result = await prisma.$transaction( async (prisma) => {
            const restaurant = await this.RestaurantRepository.deleteAsAdmin( prisma, uuid_restaurant );

            const service = await this.ServiceRepository.deleteAsAdmin( prisma, uuid_restaurant );

            return restaurant;
        });

        return result;
    }

    async getRestaurantByUuid ( uuid_restaurant ) {
        return await this.RestaurantRepository.getRestaurantByUuid( uuid_restaurant );
    }

    async getRestaurantPagination( page, size, orderBy, filter ) {
        return await this.RestaurantRepository.getRestaurantPagination( page, size, orderBy, filter );
    }

}

module.exports = RestaurantService;