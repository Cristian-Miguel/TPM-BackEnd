const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class RestaurantTableService {

    constructor( RestaurantTableRepository ){
        this.RestaurantTableRepository = RestaurantTableRepository;
    }

    async createTable({ number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved }) {
        const result = prisma.$transaction(async (prisma) => {
            return await this.RestaurantTableRepository
                .createTable( prisma, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, uuid_restaurant, reserved );
        });

        return result;
    }

    async createTablesExtractingExcelData( file_path, uuid_restaurant ) {

        const result = prisma.$transaction(async (prisma) => {
            return await this.RestaurantTableRepository
                .createTables( prisma, file );
        });

        return result;
    }

    async createTablesExtractingCSVData( file_path, uuid_restaurant) {
        const result = prisma.$transaction(async (prisma) => {
            return await this.RestaurantTableRepository
                .createTables( prisma, file );
        });

        return result;
    }

    async updateTable({ id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved }) {
        const result = prisma.$transaction(async (prisma) => {
            return await this.RestaurantTableRepository
                .updateTable( prisma, id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved );
        });

        return result;
    }

    async deleteTable({ id_restaurant_table }) {
        const result = prisma.$transaction(async (prisma) => {
            return await this.RestaurantTableRepository
                .deleteTable( prisma, id_restaurant_table );
        });

        return result;
    }

    async deleteTables({ listIds }){
        const result = prisma.$transaction(async (prisma) => {
            return await this.RestaurantTableRepository
                .deleteTables( prisma, listIds );
        });

        return result;
    }

    async getTableById({ id_restaurant_table }) {
        return await this.RestaurantTableRepository.getTableById( id_restaurant_table );
    }

    async getTablesByRestaurant({ uuid_restaurant }){
        return await this.RestaurantTableRepository.getTablesByRestaurant( uuid_restaurant );
    }

    async getTablesPagination({ page, size, orderBy, filter }){
        return await this.RestaurantTableRepository.getTablesPagination( page, size, orderBy, filter );
    }
}

module.exports = RestaurantTableService;
