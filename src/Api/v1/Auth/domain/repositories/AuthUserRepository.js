
class AuthUserRepository {

    async CreateAddress(  ) {
        throw new Error('Method not implemented.');
    }

    async CreateUserAndAddress( email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ){
        throw new Error('Method not implemented.');
    }

    async FindByEmailPassword( email, password ){
        throw new Error('Method not implemented.');
    }

    async UpdateToken( token ){
        throw new Error('Method not implemented.');
    }

    async UpdateTokenAndLoginDate( uuid, token ){
        throw new Error('Method not implemented.');
    }

}

module.exports = AuthUserRepository;