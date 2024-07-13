const ValidationRepository = require('./ValidationRepository');
const prisma = require('../../../shared/infrastructure/database/PrismaCliente');

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

}

module.exports = PrismaValidationRepository;