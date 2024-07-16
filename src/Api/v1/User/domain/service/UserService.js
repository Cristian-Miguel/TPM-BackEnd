
class UserService {
    constructor( UserRepository ){
        this.UserRepository = UserRepository;
    }

    async createUser({ email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }){
        return this.UserRepository
            .createUser( email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol );
    }

    async deleteUser( uuid ){
        return this.UserRepository.deleteUser( uuid );
    }

    async updateUser({ uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }){
        return this.UserRepository
            .updateUser( uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol );
    }

    async getUserByUuid( uuid ){
        return this.UserRepository.getUserByUuid( uuid );
    }

    async getUserByEmail( email ){
        return this.UserRepository.getUserByEmail( email );
    }

    async getUsersByPagination( page, skip, size, orderBy, filter ){

    }
}

module.exports = UserService;