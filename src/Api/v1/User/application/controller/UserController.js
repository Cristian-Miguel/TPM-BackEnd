const { response, request } = require( 'express' );//it's redundant
const UserRepository = require( '../../domain/repository/PrismaUserRepository' );
const AddressUserRepository = require( '../../../Address/domain/repository/PrismaAddressUserRepository.js' );
const UserService = require( '../../domain/service/UserService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

const userService = new UserService( UserRepository, AddressUserRepository );

class UserController {

    async createUser( req = request, res = response ) {

        try {
            const result = await userService.createUser( req.body );

            return res.status(201).json({
                success: true,
                uuid_user: result.uuid_user,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch ( error ) {
            if( error instanceof PrismaError ){
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
                
            }

        }

    }

    async updateUser( req = request, res = response ) {

        try {
            const result = await userService.updateUser( req.body );

            return res.status(200).json({
                success: true,
                uuid_user: result.uuid_user,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch ( error ) {
            if( error instanceof PrismaError ){
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
                
            }

        }

    }

    async deleteUser( req = request, res = response ) {

        try {
            const result = await userService.deleteUser( req.query );

            return res.status(200).json({
                success: true,
                uuid_user: result.uuid_user,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch ( error ) {
            if( error instanceof PrismaError ){
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
                
            }

        }

    }

    async getUserByUuid( req = request, res = response ) {

        try {
            const result = await userService.getUserByUuid( req.query );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch ( error ) {
            if( error instanceof PrismaError ){
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
                
            }

        }

    }

    async getUserByEmail( req = request, res = response ) {

        try {
            const result = await userService.getUserByEmail( req.query );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch ( error ) {
            if( error instanceof PrismaError ){
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
                
            }

        }

    }

    async getUsersByPagination( req = request, res = response ){

        try {
            const result = await userService.getUsersByPagination( req.body );

            return res.status(201).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch ( error ) {
            if( error instanceof PrismaError ){
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
                
            }

        }
    }

}

module.exports = new UserController();