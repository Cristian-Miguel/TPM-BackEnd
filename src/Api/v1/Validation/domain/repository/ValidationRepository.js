
class ValidationRepository {

    async FindEmail( email ) {
        throw new Error('Method not implemented.');
    }

    async FindUser( email, uuid ){
        throw new Error('Method not implemented.');
    }

    async FindUserByUuid( uuid ) {
        throw new Error('Method not implemented.');
    }

    async FindRolById( id_rol ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = ValidationRepository;