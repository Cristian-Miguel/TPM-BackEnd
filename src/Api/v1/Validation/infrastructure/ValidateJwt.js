const { response, request } = require( 'express' )//it's redundant
const jwt = require( 'jsonwebtoken' )
const serverConfig = require( 'config' );
const ValidateController = require( '../application/ValidationController' );
const ResponseCodeMessage = require( '../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require('winston');
require( '../../Shared/domain/log/Logger' );

const validateController = new ValidateController();

class ValidateJwt {
    
    async validateToken ( req = request, res = response, next ) {

        try {
            //Check if the token if its different to null or undefine
            const token = req.headers.authorization.split(' ')[1];

            if( !token ) {
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User token invalid');

                return res.status(401).json({
                    success: false,
                    error: 'Invalid token'
                });
            } 
            
            const secret = serverConfig.get( 'security.JWT_SECRET' );
            const { uuid_user, email } = jwt.verify( token, secret );

            if ( !await validateController.validateEmail( email ) ) {
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User email invalid');
                
                return res.status(401).json({
                    success: false,
                    error: 'Email doen\'t exits'
                });
            }
                
            const userInfo = await validateController.getUserInfo( email, uuid_user );

            if ( !userInfo ) {
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User invalid');
                
                return res.status(401).json({
                    success: false,
                    error: 'User doen\'t exits'
                });
            }

            next();

        } catch (error) {
            const tokenLogger = winston.loggers.get('TokenLogger');
            tokenLogger.error('Error Token validate', {
                genericError: error,
            });
            
            return res.status(500).json({
                success: false,
                error: ResponseCodeMessage.CODE_500,
                stack: error
            });

        }
        
    }

    async validteTokenSocket( token = '' ) {

        try {
            if( !token ) {
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User token invalid');

                return res.status(401).json({
                    success: false,
                    error: 'Invalid token'
                });
            }

            const secret = serverConfig.get( 'security.JWT_SECRET' );
            const { uuid_user, email } = jwt.verify( token, secret );

            const exist = await validateController.validateEmail( email );

            if( !exist ) {
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User email socket invalid');
                
                return res.status(401).json({
                    success: false,
                    error: 'Email doen\'t exits'
                });
            }

            const userInfo = await validateController.getUserInfo( email, uuid_user );

            if ( !userInfo ) {
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User socket invalid');
                
                return res.status(401).json({
                    success: false,
                    error: 'User doen\'t exits'
                });
            }

            // return userInfo;
            next();
 
        } catch (error) {
            const tokenLogger = winston.loggers.get('TokenLogger');
            tokenLogger.warn('User socket token invalid');
            
            return res.status(500).json({
                success: false,
                error: ResponseCodeMessage.CODE_500,
                stack: error
            });

        }

    }

}

module.exports = new ValidateJwt();