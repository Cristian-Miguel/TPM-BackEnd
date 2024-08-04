
class RestaurantRepository {

    async createRestaurant ( prismaSQL, uuid_restaurant, name, descripcion, main_image, uuid_user, id_restaurant_category, email, phone_number, webside, open_hour, close_hour ) {
        throw new Error('Method not implemented.');
    }

    async updateRestaurant ( prismaSQL, uuid_restaurant, name, descripcion, main_image, uuid_user, 
        id_restaurant_category, email, phone_number, webside, open_hour, close_hour ) {
            throw new Error('Method not implemented.');
    }

    async deleteAsSeller ( prismaSQL, uuid_restaurant ) {
        throw new Error('Method not implemented.');
    }

    async deleteAsAdmin ( prismaSQL, uuid_restaurant ) {
        throw new Error('Method not implemented.');
    }

    async getRestaurantByUuid ( uuid_restaurant ) {
        throw new Error('Method not implemented.');
    }

    async getRestaurantPagination( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }
}

module.exports = RestaurantRepository;