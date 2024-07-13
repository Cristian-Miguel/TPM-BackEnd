const ValidationRepository = require('../domain/repository/ValidationRepository.js');
const ValidationService = require('../domain/service/ValidationService.js');
const { get_JWT } = require('../../../shared/infrastructure/JWT/Jwt.js');

const validationService = new ValidationService(ValidationRepository, get_JWT );

class ValidationController {

    async validateEmail( email ){
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

}

module.exports = ValidationController;