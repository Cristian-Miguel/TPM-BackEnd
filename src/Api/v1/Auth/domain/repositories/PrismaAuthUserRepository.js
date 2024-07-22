const AuthUserRepository = require('./AuthUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class PrismaAuthUserRepository extends AuthUserRepository {

    async CreateAddress( id_user, street,city, state, country, postal_code ) {
        return await prisma.tbl_address_user.create({
            data: {
                id_user:        id_user,
                street:         street,
                city:           city,
                state:          state,
                country:        country,
                postal_code:    postal_code,
                date_created:   new Date().toISOString()
            }
        });
    }

    async CreateUser( email, username, image_profile, password, first_name, last_name, birth_day, google_sign, token, refresh_token, id_rol ){
        return await prisma.tbl_user.create({
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

    async FindByEmailPassword( email, password ){
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

    async UpdateToken( uuid, token ){
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

    async UpdateTokenAndLoginDate( uuid, token ){
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