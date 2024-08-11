const ValidationRepository = require('../domain/repository/PrismaValidationRepository.js');
const ValidationService = require('../domain/service/ValidationService.js');
const { get_JWT } = require('../../Shared/infrastructure/JWT/Jwt.js');

const validationService = new ValidationService(ValidationRepository, get_JWT );

class ValidationController {

    async validateEmail( email ) {

        try {
            return await validationService.checkEmailValidation( email );
            
        } catch (error) {
            return false;

        }

    }

    async getUserInfo( email ) {

        try {
            return await validationService.getUserBasicInfo( email );

        } catch (error) {
            return null;

        }

    }

    async getUserInfoByUuid( uuid ) {

        try {
            return await validationService.getUserBasicInfoByUuid( uuid );

        } catch (error) {
            return null;

        }

    }

    async getIdRolByIdRol( id_rol ) {

        try {
            return await validationService.getRolById( id_rol );

        } catch (error) {
            
            return null;

        }

    }

    async getIdRolByName( name ) {

        try {
            return await validationService.getRolByName( name );

        } catch( error ) {
            return null;

        }

    }

}

module.exports = ValidationController;