const ValidationRepository = require('./ValidationRepository');
const prisma = require('../../../Shared/domain/database/PrismaCliente');

class PrismaValidationRepository extends ValidationRepository {

    async findEmail( email ) {
        return prisma.tbl_user.findUnique({
            select:{
                email: true
            },
            where: {
                email: email,
            }
        });
    }

    async findUser( email, uuid ) {
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

    async findUserByUuid( uuid ) {
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

    async findRolById( id_rol ) {
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

    async findRolByName( name ) {
        return prisma.tbl_rol.findUnique({
            select: {
                name: true,
                description: true,
                id_rol: true
            },
            where: {
                name
            }
        });
    }

}

module.exports = new PrismaValidationRepository();