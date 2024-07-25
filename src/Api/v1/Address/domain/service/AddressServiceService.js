const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class AddressServiceService {

    constructor( AddressServiceRepository ){
        this.AddressServiceRepository = AddressServiceRepository;
    }

    async createAddressService ( street, city, state, postal_code, country, id_service ) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressServiceRepository.createAddressService(
                 street, city, state, postal_code, country, id_service
            );

        });

        return result;
    }

    async deleteAsAdminAddressService ({ uuid_address_service }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressServiceRepository.deleteAsAdminAddressService(
                uuid_address_service
            );  
        });
        
        return result;
    }

    async deleteAsUserAddressService ({ uuid_address_service }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressServiceRepository.deleteAsUserAddressService(
                uuid_address_service
            );
            
        });

        return result;
    }

    async updateAddressService ({ uuid_address_service, street, city, state, postal_code, country, id_service }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.AddressServiceRepository.updateAddressService(
                uuid_address_service, street, city, state, postal_code, country, id_service
            );
            
        });

        return result;
    }

    async getAddressServicePagination ({ page, size, orderBy, filter }) {
        return await this.AddressServiceRepository.getAddressService(
            page, size, orderBy, filter
        );
    }

    async getAddressServiceByUuid ({ uuid_address_service }) {
        return await this.AddressServiceRepository.getAddressServiceByUuid(
            uuid_address_service
        );
    }
}

module.exports = AddressServiceService;
