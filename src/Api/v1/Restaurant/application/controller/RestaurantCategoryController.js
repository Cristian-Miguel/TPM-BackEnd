const { response, request } = require( 'express' );//it's redundant
const RestaurantCategoryRepository = require( '../../domain/repository/PrismaRestaurantCategoryRepository' );
const RestaurantCategoryService = require( '../../domain/service/RestaurantCategoryService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const restaurantCategoryService = new RestaurantCategoryService( RestaurantCategoryRepository );

class RestaurantCategoryController {

    async createCategory ( req = request, res = response ) {
        try {

            const result = await restaurantCategoryService.createCategory( req.body );

            return res.status(201).json({
                success: true,
                id_restaurant_category: result.id_restaurant_category,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to create a restaurant category: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async updateCategory ( req = request, res = response ) {
        try {

            const result = await restaurantCategoryService.updateCategory( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_category: result.id_restaurant_category,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to update a restaurant category: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteCategory ( req = request, res = response ) {
        try {

            const result = await restaurantCategoryService.deleteCategory( req.params );

            return res.status(200).json({
                success: true,
                id_restaurant_category: result.id_restaurant_category,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to soft delete a restaurant category: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getCategoryById ( req = request, res = response ) {
        try {

            const result = await restaurantCategoryService.getCategoryById( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a restaurant category by id: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getCategoryPagination ( req = request, res = response ) {
        try {

            const result = await restaurantCategoryService.getCategoryPagination( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a restaurant category pagination: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }
}

module.exports = new RestaurantCategoryController();