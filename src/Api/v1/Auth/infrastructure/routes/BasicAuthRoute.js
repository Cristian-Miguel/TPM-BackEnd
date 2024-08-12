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
            check( 'password', 'Password don\'t have 50 caracters' ).isLength({ min: 50, max: 50 }),
            DataValidate
        ],
        BasicAuthController.signIn
    )

    .post(
        '/sign_up',
        [   
            check( 'username', 'invalid username or is empty' ).not().isEmpty(),
            check( 'username', 'User name is max size of 50 chatacters' ).isLength({ max:50 }),
            check( 'email', 'Email is required' ).not().isEmpty(),
            check( 'email', 'Invalid email' ).isEmail(),
            check( 'email', 'Email is too long to saved, max characters 255' ).isLength({ max:255 }),
            check( 'email', 'The email exist' ).not().custom( ValidationCustomJsonField.existEmail ),
            check( 'password', 'The field is empty or doesn\'t have 50 characters' ).isLength({ min: 50, max: 50 }),
            //Validate profile object
            check( 'profile',               'Profile must be an object').isObject(),
            check( 'profile.first_name',    'First name is required' ).not().isEmpty(),
            check( 'profile.first_name',    'First name is string type and less of 100 characters' ).isString().isLength({ max:100 }),
            check( 'profile.last_name',     'Last name is required' ).not().isEmpty(),
            check( 'profile.last_name',     'Last name is string type and less of 100 characters' ).isString().isLength({ max:100 }),
            check( 'profile.birth_day',     'The field is empty' ).not().isEmpty(),
            check( 'profile.birth_day',     'The field isn\'t a date' ).isISO8601(),
            //Validate address object
            check( 'address',           'Address must be an object' ).isObject(),
            check( 'address.street',    'Street is required' ).not().isEmpty(),
            check( 'address.street',    'Street is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.city',      'City is required' ).not().isEmpty(),
            check( 'address.city',      'City is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.state',     'State is required' ).not().isEmpty(),
            check( 'address.state',     'State is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.country',   'Country is required' ).not().isEmpty(),
            check( 'address.country',   'Country is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.zip_code',  'Zip code is required' ).not().isEmpty(),
            check( 'address.zip_code',  'Zip code isn\'t a integer' ).isInt(),
            check( 'address.zip_code',  'Zip code must be a valid US postal code' ).isPostalCode( 'US' ),
            DataValidate
        ],
        BasicAuthController.signUp
    );

module.exports = router