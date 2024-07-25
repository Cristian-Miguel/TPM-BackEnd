const { response, request } = require( 'express' );//it's redundant
const HotelRepository = require( '../../domain/repository/PrismaHotelRepository' );
const HotelService = require( '../../domain/service/HotelService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const hotelService = new HotelService( HotelRepository );

class HotelController {

    async createHotel ( req = request, res = response ) {
        try {

            const result = await hotelService.createHotel( req.body );

            return res.status(201).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to create a hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async deleteHotelAdmin ( req = request, res = response ) {
        try {

            const result = await hotelService.deleteHotelAdmin( req.params );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to hard delete a hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async deleteHotelSeller ( req = request, res = response ) {
        try {

            const result = await hotelService.deleteHotelSeller( req.params );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to soft delete a hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async updateHotel ( req = request, res = response ) {
        try {

            const result = await hotelService.updateHotel( req.body );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to update a hotel: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async getHotelPagination ( req = request, res = response ) {
        try {

            const result = await hotelService.getHotelPagination( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get hotels pagination: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async getHotelByUuid ( req = request, res = response ) {
        try {

            const result = await hotelService.getHotelByUuid( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get a hotel by uuid: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

}

module.exports = new HotelController();