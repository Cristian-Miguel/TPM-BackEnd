
class RestaurantTableRepository {

    async createTable( number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved ) {
        throw new Error('Method not implemented.');
    }

    async createTables( tables ) {
        throw new Error('Method not implemented.');
    }

    async updateTable( id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved ) {
        throw new Error('Method not implemented.');
    }

    async deleteTable( id_restaurant_table ){
        throw new Error('Method not implemented.');
    }

    async deleteTables( listIds ){
        throw new Error('Method not implemented.');
    }

    async getTableById( id_restaurant_table ) {
        throw new Error('Method not implemented.');
    }

    async getTablesByRestaurant( uuid_restaurant ){
        throw new Error('Method not implemented.');
    }

    async getTablesPagination( page, size, orderBy, filter ){
        throw new Error('Method not implemented.');
    }

}

module.exports = RestaurantTableRepository;