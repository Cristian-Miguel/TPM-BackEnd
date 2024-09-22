const { response, request } = require( 'express' );//it's redundant
const { get_JWT } = require( '../../../Shared/infrastructure/JWT/Jwt.js' );
const AuthUserRepository = require( '../../domain/repositories/PrismaAuthUserRepository.js' );
const UserRepository = require( '../../../User/domain/repository/PrismaUserRepository.js' );
const AddressUserRepository = require( '../../../Address/domain/repository/PrismaAddressUserRepository.js' );
const AuthService = require( '../../domain/services/AuthUserService.js' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage.js' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

const authService = new AuthService( AuthUserRepository, UserRepository, AddressUserRepository, get_JWT );

class BasicAuthController {

    constructor(){
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);
    }
    
    async signUp( req = request, res = response ) {

        try {
            const token = await authService.signUp( req.body );

            if ( token ) {
                return this.sendSuccessResponse( res, 201, token, ResponseCodeMessage.CODE_201 );

            } else {
                
                return res.status(400).json({
                    success: false,
                    message: "Check your information that sended",
                    error: ResponseCodeMessage.CODE_500
                });   
            }

        } catch( error ) {
            return this.handleError( res, error );

        }
        
    }

    async signIn( req = request, res = response ) {

        try {
            const token = await authService.signIn( req.body );

            if( token ) {
                return this.sendSuccessResponse( res, 200, token, ResponseCodeMessage.CODE_200 );

            } else {

                return res.status(401).json({
                    success: false,
                    message: "Check your email o password",
                    error: ResponseCodeMessage.CODE_401
                });

            }

        } catch ( error ) {
            return this.handleError( res, error );
    
        }

    }

    sendSuccessResponse( res, statusCode, token, message ) {
        return res.status(statusCode).json({
            success: true,
            message,
            token
        });
    }

    handleError( res, error ) {
        if(error instanceof PrismaError){
            const { messageApiClient } = error;
        
            return res.status(500).json({
                success: false,
                message: messageApiClient,
                error: ResponseCodeMessage.CODE_500
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

module.exports = new BasicAuthController();