

class AuthService {
    constructor(AuthUserRepository, jwt, config ){
        this.AuthUserRepository = AuthUserRepository;
        this.jwt = jwt;
        this.config = config;
    }

    async signUp({ email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }){
        
        const user = await this.AuthUserRepository.CreateUser(
            email, 
            username, 
            image_profile === null ? 'default' : body.image_profile, 
            password, 
            first_name, 
            last_name, 
            birth_day, 
            0, 
            token, 
            token, 
            1
        );

        const token = await get_JWT( uuid_user, user.email, user.username, user.image_profile, user.id_rol );

        return 
    }

    async signIn({ email, password }){

    }

}