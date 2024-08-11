const { response, request } = require( 'express' );//it's redundant
const { get_JWT } = require( '../../../Shared/infrastructure/JWT/Jwt.js' );
const AuthUserRepository = require( '../../domain/repositories/PrismaAuthUserRepository.js' );
const UserRepository = require( '../../../User/domain/repository/PrismaUserRepository.js' );
const AddressUserRepository = require( '../../../Address/domain/repository/PrismaAddressUserRepository.js' )
const AuthService = require( '../../domain/services/AuthUserService.js' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage.js' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

const authService = new AuthService( AuthUserRepository, UserRepository, AddressUserRepository, get_JWT );

class BasicAuthController {
    
    async signUp( req = request, res = response ) {

        try {
            const token = await authService.signUp( req.body );

            if ( token ) {

                return res.status(201).json({
                    success: true,
                    token: token,
                    msg: ResponseCodeMessage.CODE_201
                });

            } else {
                
                return res.status(500).json({
                    success: false,
                    message: "Check your information that sended",
                    error: ResponseCodeMessage.CODE_500
                });   
            }

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

    async signIn( req = request, res = response ) {

        try {
            const token = await authService.signIn( req.body );

            if( token ) {

                return res.status(200).json({
                    success: true,
                    token: token,
                    msg: ResponseCodeMessage.CODE_200
                });

            } else {

                const auth_logger = winston.loggers.get('AuthLogger');
                auth_logger.info('User unauthenticate');

                return res.status(401).json({
                    success: false,
                    message: "Check your email o password",
                    error: ResponseCodeMessage.CODE_401
                });

            }

        } catch ( error ) {
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
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }
    
        }

    }

}

module.exports = new BasicAuthController();