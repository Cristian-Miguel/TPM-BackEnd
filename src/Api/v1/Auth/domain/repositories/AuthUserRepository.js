
class AuthUserRepository {

    async findByEmailPassword( email, password ){
        throw new Error('Method not implemented.');
    }

    async updateToken( prismaSQL, uuid, token ){
        throw new Error('Method not implemented.');
    }

    async updateTokenAndLoginDate( prismaSQL, uuid, token ){
        throw new Error('Method not implemented.');
    }

}

module.exports = AuthUserRepository;