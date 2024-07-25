
class AddressServiceRepository {
    async createAddressService ( street, city, state, postal_code, country, id_service ) {
        throw new Error('Method not implemented.');
    }

    async deleteAsAdminAddressService ( uuid_address_service ) {
        throw new Error('Method not implemented.');
    }

    async deleteAsUserAddressService ( uuid_address_service ) {
        throw new Error('Method not implemented.');
    }

    async updateAddressService ( uuid_address_service, street, city, state, postal_code, country, id_service ) {
        throw new Error('Method not implemented.');
    }

    async getAddressService ( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getAddressServiceByUuid ( uuid_address_service ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = AddressServiceRepository;