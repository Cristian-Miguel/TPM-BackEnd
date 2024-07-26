const AuthUserRepository = require('./AuthUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaAuthUserRepository extends AuthUserRepository {

    async findByEmailPassword( email, password ){
        return await prisma.tbl_user.findUnique({
            select:{
                uuid_user: true,
                email: true,
                username: true,
                image_profile: true,
                id_rol: true
            },
            where: {
                email: email,
                password: password
            }
        });
    }

    async updateToken( uuid, token ){
       return await prisma.tbl_user.update({
        where: {
            uuid_user: uuid
        },
        data: {
            token:  token,
            refresh_token: token
        }
    });
    }

    async updateTokenAndLoginDate( uuid, token ){
    return await prisma.tbl_user.update({
            where: {
                uuid_user: uuid
            },
            data: {
                last_logger:  new Date().toISOString(),
                token: token
            }
        }); 
    }

}

module.exports = new PrismaAuthUserRepository();