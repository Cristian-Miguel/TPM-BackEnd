const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, UserRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const UserController = require( '../../application/controller/UserController' );

const router = Router();

router
    .post(
        '/create',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
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
            ValidateJwt.validateToken,
            accessRol( AdminRol, UserRol, SellerRol ),
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

    .get(
        '/delete/:id',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            param( 'id' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        UserController.deleteUser
    )

    .get(
        '/:email',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            param( 'email' ).isEmail().withMessage( 'The param isn\'t an email' ),
            DataValidate
        ],
        UserController.getUserByEmail
    );

router
    .get(
        '/:id',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            param( 'id' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        UserController.getUserByUuid
    )

    .post(
        '/pagination',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol, UserRol ),
            check( 'page', 'Page is required' ).not().isEmpty(),
            check( 'page', 'Page is required' ).isNumeric(),
            check( 'size', 'Size is required' ).not().isEmpty(),
            check( 'size', 'Size is required' ).isNumeric(),
           
            check( 'orderBy', 'OrderBy must be an array' ).isArray(),
            body( 'orderBy.*.order_type' )
                .notEmpty().withMessage( 'order type in orderby array is required' )
                .isString().withMessage( 'order type in orderby array must be an string type' )
                .custom( ValidationCustomJsonField.validateTypeOrder ),//check have only desc and asc
            body( 'orderBy.*.field' )
                .notEmpty().withMessage( 'field in orderby array is required' )
                .isString().withMessage( 'field in orderby array must be an string type' ),

            check( 'filter', 'Filter must be an array' ).isArray(),
            body( 'filter.*.filter_type' )
                .notEmpty().withMessage( 'filter type in filter array is required' )
                .isString().withMessage( 'filter type in filter array must be an string type' )
                .custom( ValidationCustomJsonField.validateTypeFilter ),//check have only like, gt, lt, eq 
            body( 'filter.*.field' )
                .notEmpty().withMessage( 'field in filter array is required' )
                .isString().withMessage( 'field in filter array must be an string type' ),
            body( 'filter.*.compare' )
                .notEmpty().withMessage( 'compare in filter array is required' ),
            DataValidate
        ],
        UserController.getUsersByPagination
    );


module.exports = router;