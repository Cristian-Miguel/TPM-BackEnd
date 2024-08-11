const { response, request } = require( 'express' );//it's redundant
const HotelRepository = require( '../../domain/repository/PrismaHotelRepository' );
const ServiceRepository = require( '../../../Service/domain/repository/PrismaServiceRepository' );
const AddressServiceRepository = require( '../../../Address/domain/repository/PrismaAddressServiceRepository' );
const HotelService = require( '../../domain/service/HotelService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );

const hotelService = new HotelService( HotelRepository, ServiceRepository, AddressServiceRepository );

class HotelController {

    async createHotel ( req = request, res = response ) {

        try {
            const result = await hotelService.createHotel( req.body );

            return res.status(201).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
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

    async deleteHotelAdmin ( req = request, res = response ) {

        try {
            const result = await hotelService.deleteHotelAdmin( req.params );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
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

    async deleteHotelSeller ( req = request, res = response ) {

        try {
            const result = await hotelService.deleteHotelSeller( req.params );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
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

    async updateHotel ( req = request, res = response ) {

        try {
            const result = await hotelService.updateHotel( req.body );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
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

    async getHotelPagination ( req = request, res = response ) {

        try {
            const result = await hotelService.getHotelPagination( req.body );

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

    async getHotelByUuid ( req = request, res = response ) {

        try {
            const result = await hotelService.getHotelByUuid( req.params );

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

module.exports = new HotelController();