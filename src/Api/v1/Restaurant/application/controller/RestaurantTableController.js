const { response, request } = require( 'express' );//it's redundant
const RestaurantTableRepository = require( '../../domain/repository/PrismaRestaurantTableRepository' );
const RestaurantTableService = require( '../../domain/service/RestaurantTableService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

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

    async createTablesExtractingExcelData( req = request, res = response ) {

        try {
            const result = await restaurantTableService.createTablesExtractingExcelData( req.file.path, req.body.uuid_restaurant );

            return res.status(201).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
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

    async createTablesExtractingCSVData( req = request, res = response ) {

        try {
            const result = await restaurantTableService.createTablesExtractingCSVData( req.file.path, req.body.uuid_restaurant );

            return res.status(201).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
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

    async updateTable( req = request, res = response ) {

        try {
            const result = await restaurantTableService.updateTable( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
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

    async deleteTable( req = request, res = response ) {

        try {
            const result = await restaurantTableService.deleteTable( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
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

    async deleteTables( req = request, res = response ) {

        try {
            const result = await restaurantTableService.deleteTables( req.body );

            return res.status(200).json({
                success: true,
                id_restaurant_table: result.id_restaurant_table,
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

    async getTableById( req = request, res = response ) {

        try {
            const result = await restaurantTableService.getTableById( req.params );

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

    async getTablesByRestaurant( req = request, res = response ) {

        try {
            const result = await restaurantTableService.getTablesByRestaurant( req.params );

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

    async getTablesPagination( req = request, res = response ) {

        try {
            const result = await restaurantTableService.getTablesPagination( req.body );

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

module.exports = new RestaurantTableController();