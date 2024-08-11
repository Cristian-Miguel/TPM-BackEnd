const { response, request } = require( 'express' );//it's redundant
const AddressUserRepository = require( '../../domain/repository/PrismaAddressUserRepository' );
const AddressUserService = require( '../../domain/service/AddressUserService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

const addressUserService = new AddressUserService( AddressUserRepository );

class AddressServiceController {
    
    async createAddressUser ( req = request, res = response ) {

        try {
            const result = await addressUserService.createAddressUser( req.body );

            return res.status(201).json({
                success: true,
                uuid_address_user: result.uuid_address_user,
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
            const result = await addressUserService.deleteAsAdminAddressUser( req.params );

            return res.status(200).json({
                success: true,
                uuid_address_user: result.uuid_address_user,
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

    async deleteAsUserAddressUser ( req = request, res = response ) {

        try {
            const result = await addressUserService.deleteAsUserAddressUser( req.params );

            return res.status(200).json({
                success: true,
                uuid_address_user: result.uuid_address_user,
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

    async updateAddressUser ( req = request, res = response ) {

        try {
            const result = await addressUserService.updateAddressUser( req.body );

            return res.status(200).json({
                success: true,
                uuid_address_user: result.uuid_address_user,
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

    async getAddressUserPagination ( req = request, res = response ) {

        try {
            const result = await addressUserService.getAddressUserPagination( req.body );

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
            const result = await addressUserService.getAddressUserByUuid( req.params );

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