const UserRepository = require( './UserRepository' );
const prisma = require( '../../../shared/domain/database/PrismaCliente' );

class PrismaUserRepository extends UserRepository {

    async createUser ( email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ) {
        return prisma.tbl_user.create({
            data: {
                email:          email,
                username:       username,
                image_profile:  image_profile,
                password:       password,
                first_name:     first_name,
                last_name:      last_name,
                birth_day:      birth_day,
                token:          token,
                refresh_token:  refresh_token,
                last_logger:    new Date().toISOString(),
                user_create:    new Date().toISOString(),
                google_sign:    google_sign,
                last_update:    new Date().toISOString(),
                id_rol:         id_rol
            }
        });
    }

    async deleteUser( uuid ){
        return prisma.tbl_user.delete({
            where:{
                uuid_user: uuid
            }
        });
    }

    async updateUser( uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ){
        return prisma.tbl_user.update({
            data: {
                email:          email,
                username:       username,
                image_profile:  image_profile,
                password:       password,
                first_name:     first_name,
                last_name:      last_name,
                birth_day:      birth_day,
                token:          token,
                refresh_token:  refresh_token,
                last_logger:    new Date().toISOString(),
                user_create:    new Date().toISOString(),
                google_sign:    google_sign,
                last_update:    new Date().toISOString(),
                id_rol:         id_rol
            },
            where:{
                uuid_user: uuid
            }
        });
    }

    async getUserByUuid( uuid ) {
        return prisma.tbl_user.findUnique({
            where:{
                uuid_user: uuid
            }
        });
    }

    async getUserByEmail( email ) {
        return prisma.tbl_user.findUnique({
            where:{
                email: email
            }
        });
    }

    async getUserPagination( page, skip, size, orderBy, filter ) {
        return prisma.tbl_user.findMany({ 

        });
    }

}

module.exports = PrismaUserRepository;