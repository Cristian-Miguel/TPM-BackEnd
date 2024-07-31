
class AddressUserRepository {

    async createAddressUser ( prismaSQL, street, city, state, postal_code, country, id_user ) {
        throw new Error('Method not implemented.');
    }

    async deleteAddressUserAdmin ( prismaSQL, uuid_address_user ) {
        throw new Error('Method not implemented.');
    }

    async deleteAddressUser ( prismaSQL, uuid_address_user ) {
        throw new Error('Method not implemented.');
    }

    async updateAddressUser ( prismaSQL, uuid_address_user,  street, city, state, postal_code, country, id_user  ) {
        throw new Error('Method not implemented.');
    }

    async getAddressUserPagination ( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getAddressUserByUuid ( uuid_address_user ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = AddressUserRepository;