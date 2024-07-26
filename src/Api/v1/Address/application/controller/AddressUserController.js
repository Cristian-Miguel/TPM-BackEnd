const { response, request } = require( 'express' );//it's redundant
const AddressUserRepository = require( '../../domain/repository/PrismaAddressUserRepository' );
const AddressUserService = require( '../../domain/service/AddressUserService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

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
            
        } catch (error) {

            const user_logger = winston.loggers.get('UserLogger');
            user_logger.error(`Error try to create a address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const user_logger = winston.loggers.get('UserLogger');
            user_logger.error(`Error try to delete to an address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const user_logger = winston.loggers.get('UserLogger');
            user_logger.error(`Error try a logic delete to an address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const user_logger = winston.loggers.get('UserLogger');
            user_logger.error(`Error try to update a address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const user_logger = winston.loggers.get('UserLogger');
            user_logger.error(`Error try to get the list of address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const user_logger = winston.loggers.get('UserLogger');
            user_logger.error(`Error try to get a address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

}

module.exports = new AddressServiceController();