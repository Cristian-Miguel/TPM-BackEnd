
class AddressServiceRepository {
    async createAddressService ( prismaSQL, street, city, state, zip_code, country, id_service ) {
        throw new Error('Method not implemented.');
    }

    async deleteAddressServiceAsAdmin ( prismaSQL, uuid_address_service ) {
        throw new Error('Method not implemented.');
    }

    async deleteAddressServiceAsUser ( prismaSQL, uuid_address_service ) {
        throw new Error('Method not implemented.');
    }

    async updateAddressService ( prismaSQL, uuid_address_service, street, city, state, zip_code, country, id_service ) {
        throw new Error('Method not implemented.');
    }

    async getAddressServicePagination ( skip, take, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getAddressServiceByUuid ( uuid_address_service ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = AddressServiceRepository;