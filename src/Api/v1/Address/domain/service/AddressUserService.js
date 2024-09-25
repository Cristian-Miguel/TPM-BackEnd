const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const ErrorServiceHandler = require( '../../../Shared/domain/Handler/ErrorServiceHandler' );
const FilterOrOrderAdapter = require( '../../../Shared/domain/Handler/FilterOrOrderAdapter' );

/**
 * * Service class for manage user addresses
 *  Provides methods to create, delete , update and retrieve user addresses.
 * @class AddressUserService
 */
class AddressUserService {

    /**
     * Constructor for AddressUserService
     * 
     * @param { object } AddressUserRepository - Repository to interact with the address user data.
     */
    constructor( AddressUserRepository ) {
        this.AddressUserRepository = AddressUserRepository;

    }

    /**
     * Create a new user address
     * 
     * @param {object} addressData - The data of the address to be created.
     * @param {string} addressData.street 
     * @param {string} addressData.city
     * @param {string} addressData.state
     * @param {int} addressData.zip_code 
     * @param {string} addressData.country 
     * @param {string} addressData.uuid_user - UUID of the user who owns the address.
     * @returns {Promise<object>} - The created address.
     * @throws Will throw an error if address creation fails.
     */
    async createAddressUser ({ street, city, state, zip_code, country, uuid_user }) {

        try {
            const user = await prisma.tbl_user.findUnique({
                select:{
                    id_user: true
                },
                where:{
                    uuid_user
                }
            });
            
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.createAddressUser(
                    prisma, street, city, state, zip_code, country, user.id_user
                );

            });

            return result;

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to create a user address.', 'AddressUserLogger');
        }
        
    }

    /**
     * Deletes a user address as an admin (hard delete).
     *
     * @param {object} query - The data required for deletion.
     * @param {string} query.uuid_address_user - UUID of the address to be deleted.
     * @returns {Promise<object>} - Result of the deletion operation.
     * @throws Will throw an error if address deletion fails.
     */
    async deleteAddressUserAsAdmin ({ uuid_address_user }) {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.deleteAddressUserAsAdmin(
                    prisma, uuid_address_user
                );  
            });
            
            return result;

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to hard delete a user address.', 'AddressUserLogger');
        }
        
    }

    /**
     * Soft deletes a user address.
     *
     * @param {object} query - The data required for deletion.
     * @param {string} query.uuid_address_user - UUID of the address to be soft deleted.
     * @returns {Promise<object>} - Result of the deletion operation.
     * @throws Will throw an error if address deletion fails.
     */
    async deleteAddressUserAsUser ({ uuid_address_user }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.deleteAddressUserAsUser(
                    prisma, uuid_address_user
                );
                
            });

            return result;
        
        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to soft delete a user address.', 'AddressUserLogger');
        }

    }

    /**
     * Updates a user address.
     *
     * @param {object} addressData - The data to update the address.
     * @param {string} addressData.uuid_address_user - UUID of the address to be updated.
     * @param {string} addressData.street
     * @param {string} addressData.city
     * @param {string} addressData.state
     * @param {string} addressData.zip_code
     * @param {string} addressData.country
     * @param {string} addressData.uuid_user - UUID of the user who owns the address.
     * @returns {Promise<object>} - The updated address.
     * @throws Will throw an error if address update fails.
     */
    async updateAddressUser ({ uuid_address_user,  street, city, state, zip_code, country, uuid_user }) {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressUserRepository.updateAddressUser(
                    prisma, uuid_address_user, street, city, state, zip_code, country, uuid_user
                );
                
            });

            return result;

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to update a user address.', 'AddressUserLogger');
        }
        
    }

    /**
     * Retrieves paginated list of user addresses.
     *
     * @param {object} paginationData - The pagination, order and filter data.
     * @param {number} paginationData.page - The page number.
     * @param {number} paginationData.size - The number of items per page.
     * @param {string} paginationData.orderBy - The field to order by.
     * @param {object} paginationData.filter - The filter criteria.
     * @returns {Promise<object[]>} - The paginated list of addresses.
     * @throws Will throw an error if pagination fails.
     */
    async getAddressUserPagination ({ page, size, orderBy, filter }) {

        try {
            const skip = ( page - 1 ) * size;

            // * Create field mappings to handle both orderBy and filter cases
            const validFields = {
                street: "street",
                city: "city",
                state: "state",
                country: "country",
                zip_code: "zip_code"
            }

            const orderByAdapter = FilterOrOrderAdapter.buildOrderBy(validFields, orderBy);
            const filterAdapter = FilterOrOrderAdapter.buildFilter(validFields, filter);

            return await this.AddressUserRepository.getAddressUserPagination(
                skip, size, orderByAdapter, filterAdapter
            );

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to paginated a user address list.', 'AddressUserLogger');
        }

    }

    /**
     * Retrieves a user address by UUID.
     *
     * @param {object} query - The UUID of the address.
     * @param {string} query.uuid_address_user - UUID of the address to retrieve.
     * @returns {Promise<object>} - The address data.
     * @throws Will throw an error if retrieval fails.
     */
    async getAddressUserByUuid ({ uuid_address_user }) {
        try {
            return await this.AddressUserRepository.getAddressUserByUuid(
                uuid_address_user
            );

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to get a user address by uuid.', 'AddressUserLogger');
        }
    }

}

module.exports = AddressUserService;