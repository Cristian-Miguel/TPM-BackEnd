const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const { PrismaClientKnownRequestError } = require('@prisma/client');
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

class AuthService {
    constructor(AuthUserRepository, UserRepository, AddressUserRepository, jwt ){
        this.AuthUserRepository = AuthUserRepository;
        this.UserRepository = UserRepository;
        this.AddressUserRepository = AddressUserRepository;
        this.jwt = jwt;
    }

    async signUp({ email, username, image_profile, password, first_name, last_name, birth_day, street,city, state, country, postal_code }){
        try {
        
            const result = await prisma.$transaction(async (prisma) => {
                
                const user = await this.UserRepository.createUser(
                    prisma,
                    email, 
                    username, 
                    image_profile === null ? 'default' : body.image_profile, 
                    password, 
                    first_name, 
                    last_name, 
                    birth_day, 
                    0, 
                    "", 
                    "", 
                    1
                );

                await this.AddressUserRepository.createAddressUser( prisma, street, city, state, postal_code, country, user.uuid_user );
                
                const token = await this.jwt( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );
                
                await this.AuthUserRepository.updateToken( prisma, user.uuid_user, token );

                return token
            });

            return result;

        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                throw new PrismaError( error.code );
            }
        }
    }

    async signIn({ email, password }){
        const user = await this.AuthUserRepository.findByEmailPassword( email, password );

        const token = await this.jwt( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );

        const result = await prisma.$transaction(async (prisma) => {

            return await this.AuthUserRepository.updateTokenAndLoginDate( prisma, user.uuid_user, token );

        });

        return token;   
    }

}

module.exports = AuthService;