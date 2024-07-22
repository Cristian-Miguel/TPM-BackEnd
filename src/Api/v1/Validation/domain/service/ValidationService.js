
class ValidationService {
    constructor(ValidationRepository, jwt ){
        this.ValidationRepository = ValidationRepository;
        this.jwt = jwt;
    }

    async checkEmailValidation( email ){

        const emailValidate = await this.ValidationRepository.FindEmail( email );

        return emailValidate !== null;
    }

    async getUserBasicInfo( email ) {
        return await this.ValidationRepository.FindUser( email );
    }

    async getUserBasicInfoByUuid( uuid ) {
        return await this.ValidationRepository.FindUserByUuid( uuid );
    }

    async getRolById ( id_rol ) {
        return await this.ValidationRepository.FindRolById( id_rol );
    }
}

module.exports = ValidationService;