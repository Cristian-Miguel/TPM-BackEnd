
class UserRepository {

    async createUser ( prismaSQL, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ) {
        throw new Error('Method not implemented.');
    }

    async deleteUser( prismaSQL, uuid ){
        throw new Error('Method not implemented.');
    }

    async updateUser( prismaSQL, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ){
        throw new Error('Method not implemented.');
    }

    async getUserByUuid( uuid ) {
        throw new Error('Method not implemented.');
    }

    async getUserByEmail( email ) {
        throw new Error('Method not implemented.');
    }

    async getUserPagination( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = UserRepository;