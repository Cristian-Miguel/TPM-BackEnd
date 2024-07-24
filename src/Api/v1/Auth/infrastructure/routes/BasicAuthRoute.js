const { Router } = require('express');
const { check } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const router = Router();
const BasicAuthController = require( '../../application/controller/BasicAuthController' );

router
    .post(
        '/sign_in', 
        [
            check( 'email', 'Email is invalid or is Empty' ).isEmail(),
            check( 'email' ).custom( ValidationCustomJsonField.existEmail ),
            check( 'password', 'Password ' ).not().isEmpty(),
            check( 'password', 'Password don\'t have 50 caracters' ).isLength({ min: 49, max: 51}),
            DataValidate
        ],
        BasicAuthController.signIn
    )

    .post(
        '/sign_up',
        [   
            check( 'username', 'invalid username or is empty' ).not().isEmpty(),

            check( 'email', 'The field is empty' ).not().isEmpty(),
            check( 'email', 'invalid email' ).isEmail(),
            check( 'email', 'The email exist' ).not().custom( ValidationCustomJsonField.existRole ),

            check( 'password', 'The field is empty or doesn\'t have 50 characters' ).isLength({ min: 50, max: 51 }),

            check( 'first_name', 'The field is empty' ).not().isEmpty(),
            check( 'last_name', 'The field is empty' ).not().isEmpty(),

            check( 'birth_day', 'The field is empty' ).not().isEmpty(),
            check( 'birth_day', 'The field isn\'t a date' ).isISO8601(),

            check( 'street', 'The field is empty' ).not().isEmpty(),
            check( 'city', 'The field is empty' ).not().isEmpty(),
            check( 'state', 'The field is empty' ).not().isEmpty(),
            check( 'country', 'The field is empty' ).not().isEmpty(),

            check( 'zip_code', 'The field is empty' ).not().isEmpty(),
            check( 'zip_code', 'The field isn\'t a integer' ).isInt(),
            
            DataValidate
        ],
        BasicAuthController.signUp
    );

module.exports = router