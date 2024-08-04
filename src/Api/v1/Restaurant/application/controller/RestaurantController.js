const { response, request } = require( 'express' );//it's redundant
const RestaurantRepository = require( '../../domain/repository/PrismaRestaurantRepository' );
const ServiceRepository = require( '../../../Service/domain/repository/PrismaServiceRepository' );
const AddressServiceRepository = require( '../../../Address/domain/repository/AddressServiceRepository' );
const RestaurantService = require( '../../domain/service/RestaurantService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const restaurantService = new RestaurantService( RestaurantRepository, ServiceRepository, AddressServiceRepository );

class RestaurantController {

    async createRestaurant( req = request, res = response ) {
        try {

            const result = await restaurantService.createRestaurant( req.body );

            return res.status(201).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_201
            });

        } catch( error ) {

            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to create a restaurant: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async updateRestaurant( req = request, res = response ){
        try {

            const result = await restaurantService.updateRestaurant( req.body );

            return res.status(200).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {

            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to update a restaurant: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteAsSeller( req = request, res = response ){
        try {

            const result = await restaurantService.deleteAsSeller( req.params );

            return res.status(200).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {

            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to soft delete a restaurant: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteAsAdmin( req = request, res = response ){
        try {

            const result = await restaurantService.deleteAsAdmin( req.params );

            return res.status(200).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {

            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to hard delete a restaurant: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getRestaurantByUuid( req = request, res = response ){
        try {

            const result = await restaurantService.getRestaurantByUuid( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {

            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a restaurant by uuid: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });

        }
    }

    async getRestaurantPagination( req = request, res = response ){
        try {

            const result = await restaurantService.getRestaurantPagination( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {

            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a pagination of restaurant: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }
}

module.exports = new RestaurantController();