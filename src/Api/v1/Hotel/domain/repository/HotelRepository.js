
class HotelRepository {
    async createHotel ( prismaSQL, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {
        throw new Error('Method not implemented.');
    }

    async deleteHotelAdmin ( prismaSQL, uuid ) {
        throw new Error('Method not implemented.');
    }

    async deleteHotelSeller ( prismaSQL, uuid ) {
        throw new Error('Method not implemented.');
    }

    async updateHotel ( prismaSQL, uuid, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {
        throw new Error('Method not implemented.');
    }

    async getHotelPagination ( skip, take, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getHotelByUuid ( uuid ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = HotelRepository;