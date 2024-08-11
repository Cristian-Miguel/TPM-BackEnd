const { response, request } = require( 'express' );//it's redundant
const RoomCategoryRepository = require( '../../domain/repository/PrismaRoomCategoryReporsitory' );
const RoomCategoryService = require( '../../domain/service/RoomCategoryService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const roomCategoryService = new RoomCategoryService( RoomCategoryRepository );

class RoomCategoryController {

    async createRoomCategory ( req = request, res = response ) {

        try {
            const result = await roomCategoryService.createRoomCategory( req.body );

            return res.status(201).json({
                success: true,
                id_room_category: result.id_room_category,
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

    async deleteRoomCategory ( req = request, res = response ) {

        try {
            const result = await roomCategoryService.deleteRoomCategory( req.body );

            return res.status(200).json({
                success: true,
                id_room_category: result.id_room_category,
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

    async updateRoomCategory ( req = request, res = response ) {

        try {
            const result = await roomCategoryService.updateRoomCategory( req.body );

            return res.status(200).json({
                success: true,
                id_room_category: result.id_room_category,
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

    async getRoomCategoryPagination ( req = request, res = response ) {
        
        try {
            const result = await roomCategoryService.getRoomCategoryPagination( req.body );

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

    async getRoomCategoryById ( req = request, res = response ) {

        try {
            const result = await roomCategoryService.getRoomCategoryById( req.body );

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

module.exports = new RoomCategoryController();

