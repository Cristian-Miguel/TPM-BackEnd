const UserRepository = require( '../../domain/repository/PrismaUserRepository' );
const AddressUserRepository = require( '../../../Address/domain/repository/PrismaAddressUserRepository.js' );
const UserService = require( '../../domain/service/UserService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaError.js');
const FilterError = require('../../../Shared/domain/exception/FilterError.js');
const OrderByError = require('../../../Shared/domain/exception/OrderByError.js');
const userService = new UserService( UserRepository, AddressUserRepository );

class UserController {

    constructor() {
        // Binding methods to the instance to ensure 'this' is correct
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUserByUuid = this.getUserByUuid.bind(this);
        this.getUserByEmail = this.getUserByEmail.bind(this);
        this.getUsersByPagination = this.getUsersByPagination.bind(this);
    }

    async createUser( req, res ) {

        try {
            const result = await userService.createUser( req.body );

            return this.sendSuccessResponse( res, 201, { uuid_user: result.uuid_user }, ResponseCodeMessage.CODE_201 );
            
        } catch ( error ) {
            return this.handleError( res, error );

        }

    }

    async updateUser( req, res ) {

        try {
            const result = await userService.updateUser( req.body );

            return this.sendSuccessResponse( res, 200, { uuid_user: result.uuid_user }, ResponseCodeMessage.CODE_200 );
            
        } catch ( error ) {
            return this.handleError( res, error );

        }

    }

    async deleteUser( req, res ) {

        try {
            const result = await userService.deleteUser( req.query );
            
            return this.sendSuccessResponse( res, 200, { uuid_user: result.uuid_user }, ResponseCodeMessage.CODE_200 );
            
        } catch ( error ) {
            return this.handleError( res, error );

        }

    }

    async getUserByUuid( req, res ) {

        try {
            const result = await userService.getUserByUuid( req.query );
            
            return this.sendSuccessResponse( res, 200, result, ResponseCodeMessage.CODE_200 );
            
        } catch ( error ) {
            return this.handleError( res, error );

        }

    }

    async getUserByEmail( req, res ) {

        try {
            const result = await userService.getUserByEmail( req.query );
            
            return this.sendSuccessResponse( res, 200, result, ResponseCodeMessage.CODE_200 );
            
        } catch ( error ) {
            return this.handleError( res, error );

        }

    }

    async getUsersByPagination( req, res ){

        try {
            const result = await userService.getUsersByPagination( req.body );

            return this.sendSuccessResponse( res, 200, result, ResponseCodeMessage.CODE_200 );
            
        } catch ( error ) {
            return this.handleError( res, error );

        }
    }

    sendSuccessResponse( res, statusCode, data, msg ){
        return res.status(statusCode).json({
            success: true,
            ...data,
            msg,
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

module.exports = new UserController();