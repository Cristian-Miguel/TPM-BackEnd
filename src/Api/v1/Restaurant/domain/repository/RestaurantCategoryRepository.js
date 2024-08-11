
class RestaurantCategoryRepository {

    async createCategory ( prismaSQL, description ) {
        throw new Error('Method not implemented.');
    }

    async updateCategory ( prismaSQL, description ) {
        throw new Error('Method not implemented.');
    }

    async deleteCategory( prismaSQL, id_restaurant_category ) {
        throw new Error('Method not implemented.');
    }

    async getCategoryById ( id_restaurant_category ) {
        throw new Error('Method not implemented.');
    }

    async getCategoryPagination ( skip, take, orderBy, filter ) {
        throw new Error('Method not implemented.');
    }
}

module.exports = RestaurantCategoryRepository;