const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class UserService {
    constructor( UserRepository ){
        this.UserRepository = UserRepository;
    }

    async createUser({ email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }){
        const result = await prisma.$transaction(async (prisma) => {
            return await this.UserRepository
            .createUser( prisma, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol );
        });


        return result;
    }

    async deleteUser({ uuid }){
        const result = await prisma.$transaction(async (prisma) => {
            return await this.UserRepository.deleteUser( prisma, uuid );
        });

        return result;
    }

    async updateUser({ uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol }){
        const result = await prisma.$transaction(async (prisma) => {
            return await this.UserRepository
                .updateUser( prisma, uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol );
        });

        return result;
    }

    async getUserByUuid({ uuid }){
        return await this.UserRepository.getUserByUuid( uuid );
    }

    async getUserByEmail({ email }){
        return await this.UserRepository.getUserByEmail( email );
    }

    /**
     * Fetch paginated user
     * @param { number } page - The page number 
     * @param { number } size - The size of items per page
     * @param { array } orderBy  - The field that applied a order by
     * @param { array } filter - The fields that applied the filter
     */
    async getUsersByPagination({ page, size, orderBy, filter }){
        
        const [ data, count ] = await this.UserRepository.getUsersByPagination( page, size, orderBy, filter );

        return {
            data, 
            count,
            page,
            size
        }
    }
}

module.exports = UserService;