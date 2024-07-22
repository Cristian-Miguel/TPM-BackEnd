
class HotelRepository {
    async createHotel ( name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {
        throw new Error('Method not implemented.');
    }

    async deleteHotelAdmin ( uuid ) {
        throw new Error('Method not implemented.');
    }

    async deleteHotelSeller ( uuid ) {
        throw new Error('Method not implemented.');
    }

    async updateHotel ( uuid, name, descrition, main_image, id_category, id_user, phone_number, email, website, open_hour, close_hour ) {
        throw new Error('Method not implemented.');
    }

    async getHotelPagination ( page, size, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }

    async getHotelByUuid ( uuid ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = HotelRepository;