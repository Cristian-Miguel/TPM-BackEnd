const { Router, request } = require('express');
const { check, body } = require( 'express-validator' );
const { Data_Validate } = require( '../middlewares/Data_Validate' );
const { exist_email } = require('../helpers/Custom_Json_Validation');
const router = Router();
const BasicAuthController = require( '../../application/controller/BasicAuthController' );

router
    .post(
        '/sign_in', 
        [
            check( 'email', 'Email is invalid or is Empty' ).isEmail(),
            check( 'email' ).custom( exist_email ),
            check( 'password', 'Password ' ).not().isEmpty(),
            check( 'password', 'Password don\'t have 50 caracters' ).isLength({ min: 49, max: 51}),
            Data_Validate
        ],
        BasicAuthController.signIn
    )

    .post(
        '/sign_up',
        [   
            check( 'username', 'invalid username or is empty' ).not().isEmpty(),

            check( 'email', 'The field is empty' ).not().isEmpty(),
            check( 'email', 'invalid email' ).isEmail(),
            check( 'email', 'The email exist' ).not().custom( exist_email ),

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
            
            Data_Validate
        ],
        BasicAuthController.signUp
    );

module.exports = router