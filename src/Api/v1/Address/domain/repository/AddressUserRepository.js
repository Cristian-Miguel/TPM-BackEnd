
class AddressUserRepository {

    async createAddressUser ( prismaSQL, street, city, state, zip_code, country, id_user ) {
        throw new Error('Method not implemented.');
    }

    async deleteAddressUserAsAdmin ( prismaSQL, uuid_address_user ) {
        throw new Error('Method not implemented.');
    }

    async deleteAddressUserAsUser ( prismaSQL, uuid_address_user ) {
        throw new Error('Method not implemented.');
    }

    async updateAddressUser ( prismaSQL, uuid_address_user,  street, city, state, zip_code, country, id_user  ) {
        throw new Error('Method not implemented.');
    }

    async getAddressUserPagination ( skip, take, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getAddressUserByUuid ( uuid_address_user ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = AddressUserRepository;