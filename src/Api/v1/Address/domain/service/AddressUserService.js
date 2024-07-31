const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class AddressUserService {

    constructor( AddressUserRepository ){
        this.AddressUserRepository = AddressUserRepository;
    }

    async createAddressUser ({ street, city, state, postal_code, country, uuid_user }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressUserRepository.createAddressUser(
                prisma, street, city, state, postal_code, country, uuid_user
            );

        });

        return result;
    }

    async deleteAddressUserAdmin ({ uuid_address_user }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressUserRepository.deleteAsAdminAddressUser(
                prisma, uuid_address_user
            );  
        });
        
        return result;
    }

    async deleteAddressUser ({ uuid_address_user }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressUserRepository.deleteAsUserAddressUser(
                prisma, uuid_address_user
            );
            
        });

        return result;
    }

    async updateAddressUser ({ uuid_address_user,  street, city, state, postal_code, country, uuid_user }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressUserRepository.updateAddressUser(
                prisma, uuid_address_user, street, city, state, postal_code, country, uuid_user
            );
            
        });

        return result;
    }

    async getAddressUserPagination ({ page, size, orderBy, filter }) {
        return await this.AddressUserRepository.getAddressUser(
            page, size, orderBy, filter
        );
    }

    async getAddressUserByUuid ({ uuid_address_user }) {
        return await this.AddressUserRepository.getAddressUserByUuid(
            uuid_address_user
        );
    }

}

module.exports = AddressUserService;