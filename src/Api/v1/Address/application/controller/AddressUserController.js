const { response, request } = require( 'express' );//it's redundant
const AddressUserRepository = require( '../../domain/repository/PrismaAddressUserRepository' );
const AddressUserService = require( '../../domain/service/AddressUserService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const FilterError = require('../../../Shared/domain/exception/FilterError.js');
const OrderByError = require('../../../Shared/domain/exception/OrderByError.js');

const addressUserService = new AddressUserService( AddressUserRepository );

class AddressServiceController {

    constructor(){
        this.createAddressUser = this.createAddressUser.bind(this);
        this.deleteAddressUserAsAdmin = this.deleteAddressUserAsAdmin.bind(this);
        this.deleteAddressUserAsUser = this.deleteAddressUserAsUser.bind(this);
        this.updateAddressUser = this.updateAddressUser.bind(this);
        this.getAddressUserPagination = this.getAddressUserPagination.bind(this);
        this.getAddressUserByUuid = this.getAddressUserByUuid.bind(this);
    }
    
    async createAddressUser ( req = request, res = response ) {

        try {
            const result = await addressUserService.createAddressUser( req.body );

            return this.sendSuccessResponse( res, 201, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_201 );
            
        } catch( error ) {
            return this.handleError( res, error );

        }

    }

    async deleteAddressUserAsAdmin ( req = request, res = response ) {

        try {
            const result = await addressUserService.deleteAddressUserAsAdmin( req.query );

            return this.sendSuccessResponse( res, 200, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );

        }

    }

    async deleteAddressUserAsUser ( req = request, res = response ) {

        try {
            const result = await addressUserService.deleteAddressUserAsUser( req.query );

            return this.sendSuccessResponse( res, 200, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );

        }

    }

    async updateAddressUser ( req = request, res = response ) {

        try {
            const result = await addressUserService.updateAddressUser( req.body );

            return this.sendSuccessResponse( res, 200, { uuid_address_user: result.uuid_address_user }, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );

        }

    }

    async getAddressUserPagination ( req = request, res = response ) {

        try {
            const result = await addressUserService.getAddressUserPagination( req.body );
            
            return this.sendSuccessResponse( res, 200, result, ResponseCodeMessage.CODE_200 );
            
        } catch( error ) {
            return this.handleError( res, error );

        }

    }

    async getAddressUserByUuid ( req = request, res = response ) {

        try {
            const result = await addressUserService.getAddressUserByUuid( req.query );

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