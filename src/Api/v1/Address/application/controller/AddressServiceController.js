const { response, request } = require( 'express' );//it's redundant
const AddressServiceRepository = require( '../../domain/repository/PrismaAddressServiceRepository' );
const AddressServiceService = require( '../../domain/service/AddressServiceService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const addressServiceService = new AddressServiceRepository( AddressServiceRepository );

class AddressServiceController {
    async createAddressService ( req = request, res = response ) {
        try {

            const result = await addressServiceService.createAddressService( req.body );

            return res.status(201).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to create a address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async deleteAsAdminAddressService ( req = request, res = response ) {
        try {

            const result = await addressServiceService.deleteAsAdminAddressService( req.body );

            return res.status(200).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to delete to an address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async deleteAsUserAddressService ( req = request, res = response ) {
        try {

            const result = await addressServiceService.deleteAsUserAddressService( req.body );

            return res.status(200).json({
                success: true,
                uuid_address_service: result.uuid_address_service,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try a logic delete to an address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to update a address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
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
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get the list of address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

    async getAddressServiceByUuid ( req = request, res = response ) {
        try {

            const result = await hotelService.createHotel( req.body );

            return res.status(200).json({
                success: true,
                uuid_hotel: result.uuid_hotel,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const product_logger = winston.loggers.get('ProductsLogger');
            product_logger.error(`Error try to get a address: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500,
                stack: error
            });
        }
    }

}

module.exports = new AddressServiceController();