
class ValidationService {
    constructor(ValidationRepository, jwt ){
        this.ValidationRepository = ValidationRepository;
        this.jwt = jwt;
    }

    async checkEmailValidation( email ){

        const email = await this.ValidationRepository.FindEmail( email );

        return email !== null;
    }

    async getUserBasicInfo( email ) {
        return await this.ValidationRepository.FindUser( email );
    }
}

module.exports = ValidationService;