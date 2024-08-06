const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class RestaurantTableService {

    constructor( RestaurantTableRepository ){
        this.RestaurantTableRepository = RestaurantTableRepository;
    }

    async createTable({ number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved }){

    }

    async createTablesByExcel({ file }){

    }

    async createTablesByCSV({ file }){

    }

    async updateTable({ id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved }){

    }

    async deleteTable({ id_restaurant_table }){

    }

    async deleteTables({ listIds }){

    }

    async getTableById({ id_restaurant_table }) {

    }

    async getTablesByRestaurant({ uuid_restaurant }){

    }

    async getTablesPagination({ page, size, orderBy, filter }){

    }
}

module.exports = RestaurantTableService;
