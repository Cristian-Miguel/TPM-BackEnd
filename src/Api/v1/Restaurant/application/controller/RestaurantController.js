const { response, request } = require( 'express' );//it's redundant
const RestaurantRepository = require( '../../domain/repository/PrismaRestaurantRepository' );
const ServiceRepository = require( '../../../Service/domain/repository/PrismaServiceRepository' );
const AddressServiceRepository = require( '../../../Address/domain/repository/AddressServiceRepository' );
const RestaurantService = require( '../../domain/service/RestaurantService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

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
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async updateRestaurant( req = request, res = response ) {

        try {
            const result = await restaurantService.updateRestaurant( req.body );

            return res.status(200).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async deleteAsSeller( req = request, res = response ) {

        try {
            const result = await restaurantService.deleteAsSeller( req.params );

            return res.status(200).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async deleteAsAdmin( req = request, res = response ) {

        try {
            const result = await restaurantService.deleteAsAdmin( req.params );

            return res.status(200).json({
                success: true,
                uuid_restaurant: result.uuid_restaurant,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async getRestaurantByUuid( req = request, res = response ) {

        try {
            const result = await restaurantService.getRestaurantByUuid( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async getRestaurantPagination( req = request, res = response ) {
        
        try {

            const result = await restaurantService.getRestaurantPagination( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });

        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }
}

module.exports = new RestaurantController();