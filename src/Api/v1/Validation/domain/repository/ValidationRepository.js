
class ValidationRepository {

    async findEmail( email ) {
        throw new Error('Method not implemented.');
    }

    async findUser( email, uuid ){
        throw new Error('Method not implemented.');
    }

    async findUserByUuid( uuid ) {
        throw new Error('Method not implemented.');
    }

    async findRolById( id_rol ) {
        throw new Error('Method not implemented.');
    }

}

module.exports = ValidationRepository;