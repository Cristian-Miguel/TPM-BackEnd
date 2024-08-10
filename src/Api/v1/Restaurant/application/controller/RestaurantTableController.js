const { response, request } = require( 'express' );//it's redundant
const RestaurantTableRepository = require( '../../domain/repository/PrismaRestaurantTableRepository' );
const RestaurantTableService = require( '../../domain/service/RestaurantTableService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const restaurantTableService = new RestaurantTableService( RestaurantTableRepository );

class RestaurantTableController {

    async createTable( req = request, res = response ) {
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

    async createTablesExtractingExcelData( req = request, res = response ) {
        try {

            const result = await restaurantTableService.createTablesExtractingExcelData( req.file.path, req.body.uuid_restaurant );

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

    async createTablesExtractingCSVData( req = request, res = response ) {
        try {

            const result = await restaurantTableService.createTablesExtractingCSVData( req.file.path, req.body.uuid_restaurant );

            return res.status(201).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to creates tables with csv file: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async updateTable( req = request, res = response ) {
        try {

            const result = await restaurantTableService.updateTable( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to update a table: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteTable( req = request, res = response ) {
        try {

            const result = await restaurantTableService.deleteTable( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to delete a table: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteTables( req = request, res = response ){
        try {

            const result = await restaurantTableService.deleteTables( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to delete tables: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getTableById( req = request, res = response ) {
        try {

            const result = await restaurantTableService.getTableById( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get tables by id: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getTablesByRestaurant( req = request, res = response ){
        try {

            const result = await restaurantTableService.getTablesByRestaurant( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get tables by uuid restaurant: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getTablesPagination( req = request, res = response ){
        try {

            const result = await restaurantTableService.getTablesPagination( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get tables paginated: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

}

module.exports = new RestaurantTableController();