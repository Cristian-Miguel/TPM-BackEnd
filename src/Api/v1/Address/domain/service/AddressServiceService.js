const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const ErrorServiceHandler = require( '../../../Shared/domain/Handler/ErrorServiceHandler' );
const FilterOrOrderAdapter = require( '../../../Shared/domain/Handler/FilterOrOrderAdapter' );

/**
 * * Service class for manage user addresses.
 *  Provides methods to create, delete , update and retrieve user addresses.
 * @class AddressServiceService
 */
class AddressServiceService {

    /**
     * Constructor for AddressServiceService
     * 
     * @param { object } AddressServiceService - Repository to interact with the address service data.
     */
    constructor( AddressServiceRepository ) {
        this.AddressServiceRepository = AddressServiceRepository;

    }

    async createAddressService ({ street, city, state, zip_code, country, id_service }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.createAddressService(
                    prisma, street, city, state, zip_code, country, id_service
                );

            });

            return result;
        
        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to create a service address.', 'AddressServiceService');

        }
        
    }

    async deleteAddressServiceAsAdmin ({ uuid_address_service }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.deleteAddressServiceAsAdmin(
                    prisma, uuid_address_service
                );  
            });
            
            return result;
        
        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to hard delete a service address.', 'AddressUserLogger');
            
        }
        
    }

    async deleteAddressServiceAsUser ({ uuid_address_service }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.deleteAddressServiceAsUser(
                    prisma, uuid_address_service
                );
                
            });

            return result;

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to soft delete a service address.', 'AddressServiceService');
            
        }
        
    }

    async updateAddressService ({ uuid_address_service, street, city, state, zip_code, country, id_service }) {

        try{
            const result = await prisma.$transaction(async (prisma) => {
                return await this.AddressServiceRepository.updateAddressService(
                    prisma, uuid_address_service, street, city, state, zip_code, country, id_service
                );
                
            });

            return result;

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to update a service address.', 'AddressServiceService');
            
        }
        
    }

    async getAddressServicePagination ({ page, size, orderBy, filter }) {

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

            return await this.AddressServiceRepository.getAddressService(
                skip, size, orderByAdapter, filterAdapter
            );

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to paginated a service address list.', 'AddressServiceService');
            
        }
        
    }

    async getAddressServiceByUuid ({ uuid_address_service }) {

        try {
            return await this.AddressServiceRepository.getAddressServiceByUuid(
                uuid_address_service
            );

        } catch ( error ) {
            ErrorServiceHandler._handleError(error, 'Error when trying to get a service address by uuid.', 'AddressServiceService');
            
        }
        
    }

}

module.exports = AddressServiceService;
