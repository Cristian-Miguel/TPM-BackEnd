const UserRepository = require( './UserRepository' );
// const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaUserRepository extends UserRepository {

    async createUser ( prismaSQL, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ) {
        return await prismaSQL.tbl_user.create({
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

    async deleteUser( prismaSQL, uuid ){
        return await prismaSQL.tbl_user.delete({
            where:{
                uuid_user: uuid
            }
        });
    }

    async updateUser( prismaSQL, uuid, email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ){
        return prismaSQL.tbl_user.update({
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
        return await prisma.tbl_user.findUnique({
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

    async getUserPagination( page, size, orderBy, filter ) {
        const [ data, total ] = await Promise.all([
            prisma.tbl_user.findMany({
                skip: page,
                take: size,
                orderBy: orderBy,
                where: filter
            }),
            prisma.tbl_user.count({
                filter
            }),
          ]);

        return [ data, total ]
    }

}

module.exports = new PrismaUserRepository();