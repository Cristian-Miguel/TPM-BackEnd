const ValidateController = require( '../application/ValidationController' );

const validationController = new ValidateController();

class ValidationCustomJsonField {

    async existRole ( role = '' ) {
        if( role === '' ) throw new Error( 'Insert Rol' );

        if( !await validationController.getIdRolByIdRol( role ) ) throw new Error( 'Rol not found in the DB' );
    }

    async existUser( uuid = '' ){
        if( uuid === '' ) throw new Error('Insert uuid User');

        if( !await validationController.getUserInfo( uuid ) ) throw new Error('Id User not found in the DB');
    }

    async existEmail ( email = '' ) {
        if( email === '' ) throw new Error('Insert email user');

        if( !await validationController.validateEmail( email ) ) throw new Error('Email was registrate or not found in the DB');
    }
}

module.exports = ValidationCustomJsonField;