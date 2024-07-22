const { response, request } = require( 'express' );//it's redundant
const jwt = require( 'jsonwebtoken' );
const ValidateController = require( '../application/ValidationController' );
const serverConfig = require( 'config' );

const validateController = new ValidateController();

class ValidateRoles {

    async accessRol ( ...AllRoles ) {

        return async ( req = request, res = response, next ) => {
            try {
                const token = req.header('authorization');
                const secret = serverConfig.get('security.JWT_SECRET');

                const { email, id_rol, uuid_user } = jwt.verify( token, secret );

                if( !await validateController.validateEmail( email )  ){
                    const tokenLogger = winston.loggers.get('TokenLogger');
                    tokenLogger.warn('User email invalid in rol checker');
                    
                    return res.status(401).json({
                        success: false,
                        error: 'Email doen\'t exits'
                    });
                }

                const userInfo = await validateController.getUserInfo( email, uuid_user );

                if ( !userInfo ) {
                    const tokenLogger = winston.loggers.get('TokenLogger');
                    tokenLogger.warn('User invalid in rol checker');
                    
                    return res.status(401).json({
                        success: false,
                        error: 'User doen\'t exits'
                    });
                }

                const found = AllRoles.find( rols => rolls == id_rol );

                if( found === undefined ) {
                    
                    const tokenLogger = winston.loggers.get('TokenLogger');
                    tokenLogger.warn('Rol invalid');
                    
                    return res.status(401).json({
                        success: false,
                        error: 'User doen\'t exits'
                    });

                }

            } catch (error) {
            
                const tokenLogger = winston.loggers.get('TokenLogger');
                tokenLogger.warn('User email invalid in rol checker');
                
                return res.status(500).json({
                    success: false,
                    error: ResponseCodeMessage.CODE_500,
                    stack: error
                });
    
            }


        };

    }
}

module.exports = new ValidateRoles();