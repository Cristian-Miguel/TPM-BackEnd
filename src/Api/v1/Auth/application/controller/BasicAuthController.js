const { response, request } = require( 'express' );//it's redundant
const { get_JWT } = require( '../../../Shared/infrastructure/JWT/Jwt.js' );
const AuthUserRepository = require( '../../domain/repositories/PrismaAuthUserRepository.js' );
const UserRepository = require( '../../../User/domain/repository/PrismaUserRepository.js' );
const AddressUserRepository = require( '../../../Address/domain/repository/PrismaAddressUserRepository.js' )
const AuthService = require( '../../domain/services/AuthUserService.js' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage.js' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/infrastructure/Log/Logger' );

const authService = new AuthService(AuthUserRepository, UserRepository, AddressUserRepository, get_JWT);

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
                const auth_logger = winston.loggers.get('AuthLogger');
                auth_logger.info('User unauthenticate when was creating');

                return res.status(500).json({
                    success: false,
                    error: ResponseCodeMessage.CODE_500
                });   
            }

        } catch(error) {

            const auth_logger = winston.loggers.get('AuthLogger');

            if(error instanceof PrismaError){
                auth_logger.error(`Error in the database when try to sign up: \n ${ error.errorWinston } \n ${ error.messageError } \n ${ error.code }`);
            
                return res.status(500).json({
                    success: false,
                    message: error.messageError,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                auth_logger.error(`Error in the sign up: ${ error }`);
            
                return res.status(500).json({
                    success: false,
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
                })

            } else {

                const auth_logger = winston.loggers.get('AuthLogger');
                auth_logger.info('User unauthenticate');

                return res.status(401).json({
                    success: false,
                    error: ResponseCodeMessage.CODE_401
                });

            }

        } catch (error) {

            const auth_logger = winston.loggers.get('AuthLogger');

            if(error instanceof PrismaError){
                auth_logger.error(`Error in the database when try to sign in: 
                    \n ${ error.code }
                    \n ${ error.errorWinston }
                    \n ${ error.field }
                    \n ${ error.version }
                    \n ${ error.messageError }`
                );
            
                return res.status(500).json({
                    success: false,
                    message: error.messageError,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                auth_logger.error(`Error in the sign in: ${ error }`);
            
                return res.status(500).json({
                    success: false,
                    error: ResponseCodeMessage.CODE_500
                });
            }
    
        }
    }

}

module.exports = new BasicAuthController();