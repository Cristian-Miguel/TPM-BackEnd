const { Router } = require('express');
const { check, param } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const ValidateRoles = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, UserRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstants' );
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
        '/delete/:id',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            param( 'id' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        UserController.deleteUser
    )

    .get(
        '/:email',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            param( 'email' ).isEmail().withMessage( 'The param isn\'t an email' ),
            DataValidate
        ],
        UserController.getUserByEmail
    )

    .get(
        '/:id',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            param( 'id' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        UserController.getUserByUuid
    )

    .post(
        '/pagination',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol, SellerRol, UserRol ),
            check( 'page', 'Page is required' ).not().isEmpty(),
            check( 'page', 'Page is required' ).isNumeric(),
            check( 'size', 'Size is required' ).not().isEmpty(),
            check( 'size', 'Size is required' ).isNumeric(),
            check( 'orderBy', 'OrderBy must be an array' ).not().isArray(),
            check( 'filter', 'Filter must be an array' ).not().isArray(),
            DataValidate
        ],
        UserController.getUsersByPagination
    )


module.exports = router;