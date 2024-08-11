
class ValidationService {

    constructor(ValidationRepository, jwt ) {
        this.ValidationRepository = ValidationRepository;
        this.jwt = jwt;

    }

    async checkEmailValidation( email ) {
        const emailValidate = await this.ValidationRepository.findEmail( email );

        return emailValidate !== null;
    }

    async getUserBasicInfo( email ) {
        return await this.ValidationRepository.findUser( email );
    }

    async getUserBasicInfoByUuid( uuid ) {
        return await this.ValidationRepository.findUserByUuid( uuid );

    }

    async getRolById ( id_rol ) {
        return await this.ValidationRepository.findRolById( id_rol );

    }

    async getRolByName( name ) {
        return await this.ValidationRepository.findRolByName( name );
        
    }
}

module.exports = ValidationService;