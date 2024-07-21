const { response, request } = require( 'express' );//it's redundant
const HotelRoomRepository = require( '../../domain/repository/HotelRoomRepository' );
const HotelRoomService = require( '../../domain/service/HotelRoomService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const hotelRoomService = new HotelRoomService( HotelRoomRepository );

class HotelRoomController {

    async createRoomHotel ( req = request, res = response ) {
        try {

            const result = hotelRoomService.createHotelRoom( req.body );

            return res.status(201).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to create a room hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async createManyRoomHotel ( req = request, res = response ) {
        try {

            const result = hotelRoomService.createManyHotelRoom( req.body );

            return res.status(201).json({
                success: true,
                rooms_created: result.count,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to create many rooms hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteRoomHotel ( req = request, res = response ) {
        try {

            const result = hotelRoomService.deleteRoomHotel( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to delete a room hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async updateRoomHotel ( req = request, res = response ) {
        try {

            const result = hotelRoomService.updateRoomHotel( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to update a room hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getRoomHotelPagination ( req = request, res = response ) {
        try {

            const result = hotelRoomService.getRoomHotelPagination( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get pagination room hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getRoomHotelById ( req = request, res = response ) {
        try {

            const result = hotelRoomService.getRoomHotelById( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get a room hotel by id: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }
}

module.exports = new HotelRoomController();