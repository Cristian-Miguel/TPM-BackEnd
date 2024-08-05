const prisma = require( '../../../Shared/domain/database/PrismaCliente' );

class RestaurantCategoryService {

    constructor( RestaurantCategoryRepository ){
        this.RestaurantCategoryRepository = RestaurantCategoryRepository;
    }

    async createCategory ({ description }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.RestaurantCategoryRepository.createCategory( prisma, description );
        });

        return result;
    }

    async updateCategory ({ description }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.RestaurantCategoryRepository.updateCategory( prisma, description );
        });

        return result;
    }

    async deleteCategory({ id_restaurant_category }) {
        const result = await prisma.$transaction(async (prisma) => {
            return await this.RestaurantCategoryRepository.deleteCategory( prisma, id_restaurant_category );
        });

        return result;
    }

    async getCategoryById ({ id_restaurant_category }) {
        return await this.RestaurantCategoryRepository.getCategoryById( id_restaurant_category );
    }

    async getCategoryPagination ({ page, size, orderBy, filter }) {
        return await this.RestaurantCategoryRepository.getCategoryPagination( page, size, orderBy, filter );
    }

}

module.exports = RestaurantCategoryService;