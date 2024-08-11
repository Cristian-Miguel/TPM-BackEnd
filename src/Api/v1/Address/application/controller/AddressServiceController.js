const { response, request } = require( 'express' );//it's redundant
const AddressServiceRepository = require( '../../domain/repository/PrismaAddressServiceRepository' );
const AddressServiceService = require( '../../domain/service/AddressServiceService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

const addressServiceService = new AddressServiceService( AddressServiceRepository );

class AddressServiceController {

    async createAddressService ( req = request, res = response ) {

        try {
            const result = await addressServiceService.createAddressService( req.body );

            return res.status(201).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
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

    async deleteAsAdminAddressService ( req = request, res = response ) {

        try {
            const result = await addressServiceService.deleteAsAdminAddressService( req.params );

            return res.status(200).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
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

    async deleteAsUserAddressService ( req = request, res = response ) {

        try {
            const result = await addressServiceService.deleteAsUserAddressService( req.params );

            return res.status(200).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
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

    async updateAddressService ( req = request, res = response ) {

        try {
            const result = await addressServiceService.updateAddressService( req.body );

            return res.status(200).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
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

    async getAddressServicePagination ( req = request, res = response ) {

        try {
            const result = await addressServiceService.getAddressService( req.body );

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

    async getAddressServiceByUuid ( req = request, res = response ) {

        try {
            const result = await addressServiceService.getAddressServiceByUuid( req.params );

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

}

module.exports = new AddressServiceController();