const AuthUserRepository = require('./AuthUserRepository');
const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const PrismaErrorHandler = require('../../../Shared/domain/database/PrismaErrorHandler');

class PrismaAuthUserRepository extends AuthUserRepository {

    async findByEmailPassword( email, password ) {

        try {

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

        } catch( error ) {
            PrismaErrorHandler.handleError( error );

        }

    }

    async updateToken( prismaSQL, uuid, token ) {

        try {

            return await prismaSQL.tbl_user.update({
                where: {
                    uuid_user: uuid
                },
                data: {
                    token:  token,
                    refresh_token: token
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError( error );

        }

    }

    async updateTokenAndLoginDate( prismaSQL, uuid, token ) {

        try {
            return await prismaSQL.tbl_user.update({
                where: {
                    uuid_user: uuid
                },
                data: {
                    last_logger:  new Date().toISOString(),
                    token: token
                }
            });

        } catch( error ) {
            PrismaErrorHandler.handleError( error );

        }

    }

}

module.exports = new PrismaAuthUserRepository();