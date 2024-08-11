const { response, request } = require( 'express' );//it's redundant
const RestaurantCategoryRepository = require( '../../domain/repository/PrismaRestaurantCategoryRepository' );
const RestaurantCategoryService = require( '../../domain/service/RestaurantCategoryService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

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

    async updateCategory ( req = request, res = response ) {

        try {
            const result = await restaurantCategoryService.updateCategory( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_category: result.id_restaurant_category,
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

    async deleteCategory ( req = request, res = response ) {

        try {
            const result = await restaurantCategoryService.deleteCategory( req.params );

            return res.status(200).json({
                success: true,
                id_restaurant_category: result.id_restaurant_category,
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

    async getCategoryById ( req = request, res = response ) {

        try {
            const result = await restaurantCategoryService.getCategoryById( req.params );

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

    async getCategoryPagination ( req = request, res = response ) {
        
        try {
            const result = await restaurantCategoryService.getCategoryPagination( req.body );

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

module.exports = new RestaurantCategoryController();