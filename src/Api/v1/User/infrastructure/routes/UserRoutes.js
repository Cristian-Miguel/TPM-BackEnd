const { Router } = require('express');
const { check } = require( 'express-validator' );
const { DataValidate } = require( '../../../shared/infrastructure/middleware/DataValidate' );
const ValidateRoles = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, UserRol, SellerRol } = require( '../../../shared/infrastructure/constant/SystemConstants' );
const router = Router();
const UserController = require( '../../../User/application/controller/UserController' );

router
    .post(
        '/create',
        [
            ValidateRoles.accessRol( AdminRol ),
            ValidateJwt.validateToken,
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
        UserController.createUser
    )

    .post(
        '/update',
        [
            ValidateRoles.accessRol( AdminRol, UserRol, SellerRol ),
            ValidateJwt.validateToken,
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
        UserController.updateUser
    )

    .post(
        '/delete',
        [
            ValidateRoles.accessRol( AdminRol ),
            ValidateJwt.validateToken,
            check(),
            DataValidate
        ],
        UserController.deleteUser
    )

    .get(
        '/{email}',
        [

        ],
        UserController.getUserByEmail
    )

    .get(
        '/{id}',
        [

        ],
        UserController.getUserByUuid
    )

    .post(
        '/pagination',
        [

        ],
        UserController.getUsersByPagination
    )


module.exports = router;