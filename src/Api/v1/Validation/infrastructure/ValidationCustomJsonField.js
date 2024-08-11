const ValidateController = require( '../application/ValidationController' );

const validationController = new ValidateController();

class ValidationCustomJsonField {

    async existRole ( role = '' ) {
        if( role === '' ) throw new Error( 'Insert Rol' );

        if( !await validationController.getIdRolByIdRol( role ) ) throw new Error( 'Rol not found in the DB' );
    }

    async existUser ( uuid = '' ) {
        if( uuid === '' ) throw new Error('Insert uuid User');

        if( !await validationController.getUserInfo( uuid ) ) throw new Error('Id User not found in the DB');
    }

    async existEmail ( email = '' ) {
        if( email === '' ) throw new Error('Insert email user');

        if( !await validationController.validateEmail( email ) ) throw new Error('Email was registrate or not found in the DB');
    }

    validateTypeOrder( order_type = 'desc' ) {
        if( order_type === '' ) throw new Error('Insert order type valid');

        if( order_type !== 'desc' || order_type !== 'asc' ) 
            throw new Error(`Invalid order type: ${order_type}. Allowed values are: desc, asc`);
    }

    validateTypeFilter ( filter_type = '' ) {
        if( filter_type === '' ) throw new Error('Insert filter type valid');

        const allowedFilters = ['like', 'gt', 'lt', 'eq'];
        if (!allowedFilters.includes(filter_type)) {
            throw new Error(`Invalid filter type: ${filter_type}. Allowed values are: ${allowedFilters.join(', ')}`);
        }
    }

    validateFile( file = '' ){
        if(!file){
            throw new Error(`No file uploaded.`);
        }
    }
    
}

module.exports = new ValidationCustomJsonField();