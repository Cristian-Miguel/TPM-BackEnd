const prisma = require( '../../../Shared/domain/database/PrismaCliente' );
const winston = require('winston');
const PrismaError = require('../../../Shared/domain/database/PrismaError');
const FilterError = require('../../../Shared/domain/exception/FilterError');
const OrderByError = require('../../../Shared/domain/exception/OrderByError');
require( '../../../Shared/domain/log/Logger' );

class UserService {
    constructor( UserRepository, AddressUserRepository ) {
        this.UserRepository = UserRepository;
        this.AddressUserRepository = AddressUserRepository

    }

    async createUser({ email, username, image_profile, password, google_sign, token, refresh_token, id_rol, profile, address }){
        try{
            const result = await prisma.$transaction(async (prisma) => {
                 const user = await this.UserRepository
                    .createUser( 
                        prisma, 
                        email, 
                        username, 
                        image_profile === null ? 'default' : image_profile, 
                        password, 
                        profile.first_name, 
                        profile.last_name, 
                        profile.birth_day, 
                        google_sign, 
                        token, 
                        refresh_token, 
                        id_rol 
                    );

                await this.AddressUserRepository
                    .createAddressUser( 
                        prisma, 
                        address.street, 
                        address.city, 
                        address.state, 
                        address.zip_code, 
                        address.country, 
                        user.id_user 
                    );
                
                return true;
            
            });

            return result;

        } catch ( error ) {
            this._handleError( error, 'Error when trying to create a user.');

        }

    }

    async deleteUser({ uuid }) {

        try{
            const result = await prisma.$transaction(async (prisma) => {
                return await this.UserRepository.deleteUser( prisma, uuid );
            });

            return result;

        } catch ( error ) {
            this._handleError( error, 'Error when trying to delete a user.');
            
        }

    }

    async updateUser({ uuid_user, email, username, image_profile, password, google_sign, token, refresh_token, id_rol, profile, address }) {

        try {
            const result = await prisma.$transaction(async (prisma) => {
                await this.UserRepository
                    .updateUser( 
                        prisma, 
                        uuid_user,
                        email, 
                        username, 
                        image_profile === null ? 'default' : image_profile, 
                        password, 
                        profile.first_name, 
                        profile.last_name, 
                        profile.birth_day, 
                        google_sign, 
                        token, 
                        refresh_token, 
                        id_rol 
                    );

                await this.AddressUserRepository
                    .updateAddressUser( 
                        prisma, 
                        address.uuid_address_user,
                        address.street, 
                        address.city, 
                        address.state, 
                        address.zip_code, 
                        address.country, 
                        uuid_user 
                    );
                
                return true;
            });

            return result;
        } catch ( error ) {
            this._handleError( error, 'Error when trying a update a user.');
            
        }

    }

    async getUserByUuid({ uuid }) {

        try{
            return await this.UserRepository.getUserByUuid( uuid );

        } catch ( error ) {
            this._handleError( error, 'Error when trying to get a user by uuid.');
            
        }

    }

    async getUserByEmail({ email }) {
        try {
            return await this.UserRepository.getUserByEmail( email );
        
        } catch ( error ) {
            this._handleError( error, 'Error when trying to get a user by email.');

        }

    }

    /**
     * Fetch paginated user
     * @param { number } page - The page number 
     * @param { number } size - The size of items per page
     * @param { array } orderBy  - The field that applied a order by
     * @param { array } filter - The fields that applied the filter
     */
    async getUsersByPagination({ page, size, orderBy, filter }) {

        try{
            const skip = ( page - 1 ) * size;

            const prismaOrderBy = [];
            const prismaFilter = [];
            //change to orderBy prisma format
            orderBy.map( ( element ) => {
                const field = element.field;

                switch (field) {
                    case "email":
                        prismaOrderBy.push({
                            email: element.order_type
                        });
                        break;
                    case "username":
                        prismaOrderBy.push({
                            username:element.order_type
                        });
                        break;
                    case "first_name":
                        prismaOrderBy.push({
                            first_name:element.order_type
                        });
                        break;
                    case "last_name":
                        prismaOrderBy.push({
                            last_name:element.order_type
                        });
                        break;
                    case "birth_day":
                        prismaOrderBy.push({
                            birth_day:element.order_type
                        });
                        break;
                    case "user_create":
                        prismaOrderBy.push({
                            user_create:element.order_type
                        });
                        break;
                    case "id_rol":
                        prismaOrderBy.push({
                            tbl_rol: {
                                id_rol:element.order_type
                            }
                        });
                        break;
                
                    default:
                        throw new OrderByError(`The field "${field}" doesn't have implement or doesn't exist`);
                }
            } );

            //change to filter prisma format
            filter.map( ( element ) => {
                const field = element.field;

                switch (field) {
                    case "email":
                        if (element.filter_type === 'like') {
                            prismaFilter.push({
                                email:{
                                    contains: element.compare
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                email:{
                                    equals: element.compare
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow gt and lt, only eq and like`);
                        }
                        break;
                    case "username":
                        if (element.filter_type === 'like') {
                            prismaFilter.push({
                                username:{
                                    contains: element.compare
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                username:{
                                    equals: element.compare
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow gt and lt, only eq and like`);
                        }
                        break;
                    case "first_name":
                        if (element.filter_type === 'like') {
                            prismaFilter.push({
                                first_name:{
                                    contains: element.compare
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                first_name:{
                                    equals: element.compare
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow gt and lt, only eq and like`);
                        }
                        break;
                    case "last_name":
                        if (element.filter_type === 'like') {
                            prismaFilter.push({
                                last_name:{
                                    contains: element.compare
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                last_name:{
                                    equals: element.compare
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow gt and lt, only eq and like`);
                        }
                        break;
                    case "birth_day":
                        if (element.filter_type === 'gt') {
                            prismaFilter.push({
                                birth_day:{
                                    gt: element.compare
                                }
                            });
                        } else if(element.filter_type === 'lt') {
                            prismaFilter.push({
                                birth_day:{
                                    lt: element.compare
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                birth_day:{
                                    equals: element.compare
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow like, only eq, gt and lt`);
                        }
                        break;
                    case "user_create":
                        if (element.filter_type === 'gt') {
                            prismaFilter.push({
                                user_create:{
                                    gt: element.compare
                                }
                            });
                        } else if(element.filter_type === 'lt') {
                            prismaFilter.push({
                                user_create:{
                                    lt: element.compare
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                user_create:{
                                    equals: element.compare
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow like, only eq, gt and lt`);
                        }
                        break;
                    case "id_rol":
                        if (element.filter_type === 'gt') {
                            prismaFilter.push({
                                tbl_rol: {
                                    id_rol:{
                                        gt: element.compare
                                    }
                                }
                            });
                        } else if(element.filter_type === 'lt') {
                            prismaFilter.push({
                                tbl_rol: {
                                    id_rol:{
                                        lt: element.compare
                                    }
                                }
                            });
                        } else if(element.filter_type === 'eq') {
                            prismaFilter.push({
                                tbl_rol: {
                                    id_rol:{
                                        equals: element.compare
                                    }
                                }
                            });
                        } else {
                            throw new FilterError(`The field "${field}" doesn't allow like, only eq, gt and lt`);
                        }
                        break;
                
                    default:
                        throw new FilterError(`The field "${field}" doesn't have implement or doesn't exist`);
                }
            } );

            const filterAdapter = {
                AND: prismaFilter
            }

            const [ data, count ] = await this.UserRepository.getUsersByPagination( skip, size, prismaOrderBy, filterAdapter );

            return {
                data, 
                count,
                page,
                size
            }

        } catch ( error ) {
                this._handleError( error, 'Error when trying to paginate a list user.');
                
        }

    }

    //handleError in each use case
    _handleError( error, message ) {
        const user_logger = winston.loggers.get( 'UserLogger' );
        if(error instanceof PrismaError) {
            const { code, meta, message, clientVersion, typeErrorPrisma } = error;

            user_logger.error(message, {
                prismaErrorType: typeErrorPrisma,
                prismaCode: code,
                prismaMeta: meta,
                prismaMessage: message,
                prismaClientVersion: clientVersion
            });

            throw new PrismaError( code, meta, message, clientVersion, typeErrorPrisma );
        } else if(error instanceof OrderByError) {
            user_logger.error(message, {
                genericName: "Order by error",
                genericMessage: error.clientResponse,
                genericStack: error.stack
            });

            throw new OrderByError( error.clientResponse );

        } else if(error instanceof FilterError) {
            user_logger.error(message, {
                genericName: "Filter error",
                genericMessage: error.clientResponse,
                genericStack: error.stack
            });

            throw new FilterError( error.clientResponse );

        } else if(error instanceof Error) {
            user_logger.error(message, {
                genericName: error.name,
                genericMessage: error.message,
                genericStack: error.stack
            });

            throw new Error( error );

        } else {
            user_logger.error(message, {
                genericError: error,
            });

            throw new Error( error );

        }
    }

}

module.exports = UserService;