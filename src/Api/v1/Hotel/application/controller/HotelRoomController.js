const { response, request } = require( 'express' );//it's redundant
const HotelRoomRepository = require( '../../domain/repository/PrismaHotelRoomRepository' );
const HotelRoomService = require( '../../domain/service/HotelRoomService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

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

    async createManyRoomHotelByExcel ( req = request, res = response ) {

        try {
            const result = hotelRoomService.createManyHotelRoomByExcel( req.body );

            return res.status(201).json({
                success: true,
                rooms_created: result.count,
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

    async deleteRoomHotel ( req = request, res = response ) {

        try {
            const result = hotelRoomService.deleteRoomHotel( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
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

    async updateRoomHotel ( req = request, res = response ) {

        try {
            const result = hotelRoomService.updateRoomHotel( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
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

    async getRoomHotelPagination ( req = request, res = response ) {

        try {
            const result = hotelRoomService.getRoomHotelPagination( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
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

    async getRoomHotelById ( req = request, res = response ) {

        try {
            const result = hotelRoomService.getRoomHotelById( req.body );

            return res.status(200).json({
                success: true,
                id_hotel_room: result.id_hotel_room,
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

module.exports = new HotelRoomController();