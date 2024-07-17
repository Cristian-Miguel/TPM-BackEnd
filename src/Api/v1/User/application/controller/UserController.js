const { response, request } = require( 'express' );//it's redundant
const UserRepository = require( '../../domain/repository/UserRepository' );
const UserService = require( '../../domain/service/UserService' );
const ResponseCodeMessage = require( '../../../shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../shared/infrastructure/Log/Logger' );

const userService = new UserService( UserRepository );

class UserController {

    async createUser( req = request, res = response ){
        try {

            const result = userService.createUser( req.body );

            return res.status(201).json({
                success: true,
                uuid_user: result.uuid_user,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const auth_logger = winston.loggers.get('UserLogger');
            auth_logger.error(`Error try to create user: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async updateUser( req = request, res = response ){
        try {

            const result = userService.updateUser( req.body );

            return res.status(200).json({
                success: true,
                uuid_user: result.uuid_user,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const auth_logger = winston.loggers.get('UserLogger');
            auth_logger.error(`Error try to update user: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteUser( req = request, res = response ){
        try {

            const result = userService.deleteUser( req.body );

            return res.status(200).json({
                success: true,
                uuid_user: result.uuid_user,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const auth_logger = winston.loggers.get('UserLogger');
            auth_logger.error(`Error try to delete user: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getUserByUuid( req = request, res = response ){
        try {

            const result = userService.getUserByUuid( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const auth_logger = winston.loggers.get('UserLogger');
            auth_logger.error(`Error try to get user by uuid: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getUserByEmail( req = request, res = response ){
        try {

            const result = userService.getUserByEmail( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const auth_logger = winston.loggers.get('UserLogger');
            auth_logger.error(`Error try to get user by email: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getUsersByPagination( req = request, res = response ){
        try {

            const result = userService.getUsersByPagination( req.body );

            return res.status(201).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const auth_logger = winston.loggers.get('UserLogger');
            auth_logger.error(`Error try to get users pagination: ${ error }`);
            
            return response.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

}

module.exports = new UserController();