const { response, request } = require( 'express' );//it's redundant
const RestaurantTableRepository = require( '../../domain/repository/PrismaRestaurantTableRepository' );
const RestaurantTableService = require( '../../domain/service/RestaurantTableService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const restaurantTableService = new RestaurantTableService( RestaurantTableRepository );

class RestaurantTableController {

    async createTable( req = request, res = response) {
        try {

            const result = await restaurantTableService.createTable( req.body );

            return res.status(201).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to create a restaurant table: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async createTablesExtractingExcelData( req = request, res = response) {
        try {

            const result = await restaurantTableService.createTablesExtractingExcelData( req.body );

            return res.status(201).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to creates tables with excel file: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async createTablesExtractingCSVData({ file }) {
        
    }

    async updateTable({ id_restaurant_table, number_people, cost, date_reservation, type_reservation, discount_cash, discount_percentage, reserved }) {
        
    }

    async deleteTable({ id_restaurant_table }) {
       
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

module.exports = new RestaurantTableController();