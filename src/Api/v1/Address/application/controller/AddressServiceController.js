const { response, request } = require( 'express' );//it's redundant
const AddressServiceRepository = require( '../../domain/repository/PrismaAddressServiceRepository' );
const AddressServiceService = require( '../../domain/service/AddressServiceService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const FilterError = require('../../../Shared/domain/exception/FilterError.js');
const OrderByError = require('../../../Shared/domain/exception/OrderByError.js');

const addressServiceService = new AddressServiceService( AddressServiceRepository );

class AddressServiceController {

    constructor() {
        this.createAddressService = this.createAddressService.bind(this);
        this.deleteAddressServiceAsAdmin = this.deleteAddressServiceAsAdmin.bind(this);
        this.deleteAddressServiceAsUser = this.deleteAddressServiceAsUser.bind(this);
        this.updateAddressService = this.updateAddressService.bind(this);
        this.getAddressServicePagination = this.getAddressServicePagination.bind(this);
        this.getAddressServiceByUuid = this.getAddressServiceByUuid.bind(this);
    }

    async createAddressService ( req = request, res = response ) {
        try {
            const result = await addressServiceService.createAddressService( req.body );

            return this.sendSuccessResponse( res, 201, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_201 );
        } catch( error ) {
            return this.handleError( res, error );
        }
    }

    async deleteAddressServiceAsAdmin ( req = request, res = response ) {
        try {
            const result = await addressServiceService.deleteAddressServiceAsAdmin( req.params );

            return this.sendSuccessResponse( res, 200, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );
        }
    }

    async deleteAddressServiceAsUser ( req = request, res = response ) {
        try {
            const result = await addressServiceService.deleteAddressServiceAsUser( req.params );

            return this.sendSuccessResponse( res, 200, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );
        }
    }

    async updateAddressService ( req = request, res = response ) {

        try {
            const result = await addressServiceService.updateAddressService( req.body );

            return this.sendSuccessResponse( res, 200, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );
        }   
    }

    async getAddressServicePagination ( req = request, res = response ) {
        try {
            const result = await addressServiceService.getAddressServicePagination( req.body );

            return this.sendSuccessResponse( res, 200, result, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );
        }
    }

    async getAddressServiceByUuid ( req = request, res = response ) {
        try {
            const result = await addressServiceService.getAddressServiceByUuid( req.query );

            return this.sendSuccessResponse( res, 200, result, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );
        }
    }

    sendSuccessResponse( res, statusCode, data, message ){
        return res.status(statusCode).json({
            success: true,
            data,
            message,
        });
    }

    handleError( res, error ) {
        if( error instanceof PrismaError ){
            const { messageApiClient } = error;
        
            return res.status(500).json({
                success: false,
                message: messageApiClient,
                error: ResponseCodeMessage.CODE_500
            });
        
        } else if( error instanceof FilterError ) {
            const { clientResponse } = error;
        
            return res.status(400).json({
                success: false,
                message: clientResponse,
                error: ResponseCodeMessage.CODE_400
            });

        } else if( error instanceof OrderByError ) { 
            const { clientResponse } = error;
        
            return res.status(400).json({
                success: false,
                message: clientResponse,
                error: ResponseCodeMessage.CODE_400
            });

        } else {
            return res.status(500).json({
                success: false,
                message: "Error in the server",
                error: ResponseCodeMessage.CODE_500
            });
            
        }
    }

}

module.exports = new AddressServiceController();