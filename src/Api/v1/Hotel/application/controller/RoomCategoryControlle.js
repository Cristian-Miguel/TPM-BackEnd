const { response, request } = require( 'express' );//it's redundant
const RoomCategoryRepository = require( '../../domain/repository/PrismaRoomCategoryReporsitory' );
const RoomCategoryService = require( '../../domain/service/RoomCategoryService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to create a room category: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to delete a room category: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to update a room category: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get the pagination of room category: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get a room category by id: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

}

module.exports = new RoomCategoryController();

