
class UserRepository {

    async createUser ( email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ) {
        throw new Error('Method not implemented.');
    }

    async deleteUser( uuid ){
        throw new Error('Method not implemented.');
    }

    async updateUser( email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ){
        throw new Error('Method not implemented.');
    }

    async getUserByUuid( uuid ) {
        throw new Error('Method not implemented.');
    }

    async getUserByEmail( email ) {
        throw new Error('Method not implemented.');
    }

    async getUserPagination( page, skip, size ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = UserRepository;