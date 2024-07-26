
class AuthUserRepository {

    async findByEmailPassword( email, password ){
        throw new Error('Method not implemented.');
    }

    async updateToken( uuid, token ){
        throw new Error('Method not implemented.');
    }

    async updateTokenAndLoginDate( uuid, token ){
        throw new Error('Method not implemented.');
    }

}

module.exports = AuthUserRepository;