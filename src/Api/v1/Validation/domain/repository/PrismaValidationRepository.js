const ValidationRepository = require('./ValidationRepository');
const prisma = require('../../../Shared/domain/database/PrismaCliente');

class PrismaValidationRepository extends ValidationRepository {

    async FindEmail( email ) {
        return prisma.tbl_user.findUnique({
            select:{
                email: true
            },
            where: {
                email: email,
            }
        });
    }

    async FindUser( email, uuid ) {
        return prisma.tbl_user.findUnique({
            select: {
                uuid_user: true,
                email: true,
                id_rol: true
            },
            where: {
                email: email,
                uuid_user: uuid
            }
        });
    }

    async FindUserByUuid( uuid ) {
        return prisma.tbl_user.findUnique({
            select: {
                uuid_user: true,
                email: true,
                id_rol: true
            },
            where: {
                uuid_user: uuid
            }
        });
    }

    async FindRolById( id_rol ) {
        return prisma.tbl_rol.findUnique({
            select: {
                name: true,
                description: true,
                id_rol: true
            },
            where: {
                id_rol: id_rol
            }
        });
    }

}

module.exports = PrismaValidationRepository;