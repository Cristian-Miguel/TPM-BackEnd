const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { UserRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');
const winston = require('winston');
require( '../../../Shared/domain/log/Logger' );

class AuthService {

    constructor( AuthUserRepository, UserRepository, AddressUserRepository, jwt ) {
        this.AuthUserRepository = AuthUserRepository;
        this.UserRepository = UserRepository;
        this.AddressUserRepository = AddressUserRepository;
        this.jwt = jwt;

    }

    async signUp({ email, username, image_profile, password, profile, address }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                const user = await this.UserRepository.createUser(
                    prisma,
                    email, 
                    username, 
                    image_profile === null ? 'default' : image_profile, 
                    password, 
                    profile.first_name, 
                    profile.last_name, 
                    profile.birth_day, 
                    false, 
                    "", 
                    "", 
                    UserRol
                );

                await this.AddressUserRepository
                    .createAddressUser( 
                        prisma, 
                        address.street, 
                        address.city, 
                        address.state, 
                        address.zip_code, 
                        address.country, 
                        user.id_user 
                    );
                
                const token = await this.jwt( user.uuid_user, user.email, user.username, user.image_profile, UserRol );
                
                await this.AuthUserRepository.updateToken( prisma, user.uuid_user, token );

                return token;

            });

            if( !result ){
                const auth_logger = winston.loggers.get('AuthLogger');
                auth_logger.info('User unauthenticate when was creating');

            }

            return result;

        } catch ( error ) {
            this._handleError( error, "Error when trying sign up a user" );
            
        }
        
    }

    async signIn({ email, password }) {

        try {
            const user = await this.AuthUserRepository.findByEmailPassword( email, password );

            const token = await this.jwt( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );

            const result = await prisma.$transaction(async (prisma) => {

                return await this.AuthUserRepository.updateTokenAndLoginDate( prisma, user.uuid_user, token );

            });

            return token;
        } catch ( error ) {
            this._handleError( error, "Error when trying sign in a user" );

        }
        
    }

    //handleError in each use case
    _handleError( error, message ) {
        const auth_logger = winston.loggers.get( 'AuthLogger' );

        if( error instanceof PrismaError ) {
            
            const { code, meta, message, clientVersion, typeErrorPrisma } = error;

            auth_logger.error(message, {
                prismaErrorType: typeErrorPrisma,
                prismaCode: code,
                prismaMeta: meta,
                prismaMessage: message,
                prismaClientVersion: clientVersion
            });

            throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );

        } else if( error instanceof Error ) {

            auth_logger.error(message, {
                genericName: error.name,
                genericMessage: error.message,
                genericStack: error.stack
            });

            throw new Error( error );

        } else {

            auth_logger.error(message, {
                genericError: error,
            });

            throw new Error( error );

        }
    }

}

module.exports = AuthService;