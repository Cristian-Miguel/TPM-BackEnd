const { response, request } = require( 'express' );//it's redundant
const { get_JWT } = require('../../../shared/infrastructure/JWT/Jwt.js');
const AuthUserRepository = require('../../domain/repositories/AuthUserRepository.js');
const AuthService = require('../../domain/services/AuthUserService.js');
const ResponseCodeMessage = require('../../../Shared/infrastructure/constant/ResponseCodeMessage.js');
const winston = require('winston');
require( '../../../Shared/infrastructure/Log/Logger' );

const authService = new AuthService(AuthUserRepository, get_JWT);

class BasicAuthController {
    
    async signUp( req = request, res = response ) {
        try {

            const token = await authService.singUp( req.body );

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
                    error: ResponseCodeMessage.CODE_500()
                });   
            }

        } catch(error) {

            const auth_logger = winston.loggers.get('AuthLogger');
            auth_logger.error(`Error in the sign up: ${error}`);
            
            return response.status(500).json({
                success: false,
                error: ResponseCodeMessage.CODE_500()
            });

        }
    }

    async signIn( req = request, res = response ) {
        try {

            const token = await authService.singIn( req.body );

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
            auth_logger.error(`Error in the sign in: ${error}`);
    
            return response.status(500).json({
                success: false,
                error: ResponseCodeMessage.CODE_500()
            });
    
        }
    }

}

module.exports = new BasicAuthController();