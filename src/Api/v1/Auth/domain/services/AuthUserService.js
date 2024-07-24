
class AuthService {
    constructor(AuthUserRepository, jwt ){
        this.AuthUserRepository = AuthUserRepository;
        this.jwt = jwt;
    }

    async signUp({ email, username, image_profile, password, first_name, last_name, birth_day, street,city, state, country, postal_code }){
        
        const user = await this.AuthUserRepository.CreateUser(
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

        const token = await this.jwt( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );

        await this.AuthUserRepository.CreateAddress( user.id_user, street,city, state, country, postal_code );

        await this.AuthUserRepository.UpdateToken( user.uuid_user, token );

        return token;
    }

    async signIn({ email, password }){

        const user = await this.AuthUserRepository.FindByEmailPassword( email, password );

        const token = await this.jwt( user.uuid_user, user.email, user.username, user.image_profile, user.id_rol );
        
        await this.AuthUserRepository.UpdateTokenAndLoginDate( user.uuid_user, token );
        
        return token;   
    }

}

module.exports = AuthService;