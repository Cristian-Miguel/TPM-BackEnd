const { Router } = require('express');
const { check, body, query } = require( 'express-validator' );
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
            check( 'image_profile',     'Invalid url image or is empty' ).not().isEmpty(),
            check( 'image_profile',     'Image profile must be a url format' ).isURL(),
            check( 'username',          'Invalid username or is empty' ).not().isEmpty(),
            check( 'username',          'User name must be a String type' ).isString(),
            check( 'username',          'User name is max size of 50 chatacters' ).isLength({ max:50 }),
            check( 'email',             'Email is required' ).not().isEmpty(),
            check( 'email',             'Invalid email' ).isEmail(),
            check( 'email',             'Email is too long to saved, max characters 255' ).isLength({ max:255 }),
            check( 'email',             'The email exist' ).not().custom( ValidationCustomJsonField.existEmail ),
            check( 'password',          'The field is empty or doesn\'t have 50 characters' ).isLength({ min: 50, max: 50 }),
            check( 'google_sign',       'The google_sign field is empty' ).not().isEmpty(),
            check( 'google_sign',       'Google sign must be a boolean format' ).isBoolean(),
            check( 'token',             'The token field is empty' ).not().isEmpty(),
            check( 'token',             'Token must be a JWT format' ).isJWT(),
            check( 'refresh_token',     'The refresh_token field is empty' ).not().isEmpty(),
            check( 'refresh_token',     'Refresh token must be a JWT format' ).isJWT(),
            check( 'id_rol',            'The id_rol field is empty' ).not().isEmpty(),
            check( 'id_rol',            'Id rol must be a numeric format' ).isNumeric(),

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
        UserController.createUser
    )

    .put(
        '/update',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, UserRol, SellerRol ),
            check( 'uuid_user',         'Invalid  or is empty' ).not().isEmpty(),
            check( 'uuid_user',         'Image profile must be a UUID format' ).isUUID(),
            check( 'image_profile',     'Invalid url image or is empty' ).not().isEmpty(),
            check( 'image_profile',     'Image profile must be a url format' ).isURL(),
            check( 'username',          'Invalid username or is empty' ).not().isEmpty(),
            check( 'username',          'User name must be a String type' ).isString(),
            check( 'username',          'User name is max size of 50 chatacters' ).isLength({ max:50 }),
            check( 'email',             'Email is required' ).not().isEmpty(),
            check( 'email',             'Invalid email' ).isEmail(),
            check( 'email',             'Email is too long to saved, max characters 255' ).isLength({ max:255 }),
            check( 'email',             'The email exist' ).not().custom( ValidationCustomJsonField.existEmail ),
            check( 'password',          'The field is empty or doesn\'t have 50 characters' ).isLength({ min: 50, max: 50 }),
            check( 'google_sign',       'The google_sign field is empty' ).not().isEmpty(),
            check( 'google_sign',       'Google sign must be a boolean format' ).isBoolean(),
            check( 'token',             'The token field is empty' ).not().isEmpty(),
            check( 'token',             'Token must be a JWT format' ).isJWT(),
            check( 'refresh_token',     'The refresh_token field is empty' ).not().isEmpty(),
            check( 'refresh_token',     'Refresh token must be a JWT format' ).isJWT(),
            check( 'id_rol',            'The id_rol field is empty' ).not().isEmpty(),
            check( 'id_rol',            'Id rol must be a numeric format' ).isNumeric(),

            //Validate profile object
            check( 'profile',               'Profile must be an object').isObject(),
            check( 'profile.first_name',    'First name is required' ).not().isEmpty(),
            check( 'profile.first_name',    'First name is string type and less of 100 characters' ).isString().isLength({ max:100 }),
            check( 'profile.last_name',     'Last name is required' ).not().isEmpty(),
            check( 'profile.last_name',     'Last name is string type and less of 100 characters' ).isString().isLength({ max:100 }),
            check( 'profile.birth_day',     'The field is empty' ).not().isEmpty(),
            check( 'profile.birth_day',     'The field isn\'t a date' ).isISO8601(),
            
            //Validate address object
            check( 'address',                       'Address must be an object' ).isObject(),
            check( 'address.uuid_address_user',     'Uuid address user is required' ).not().isEmpty(),
            check( 'address.uuid_address_user',     'Uuid address user profile must be a UUID format' ).isUUID(),
            check( 'address.street',                'Street is required' ).not().isEmpty(),
            check( 'address.street',                'Street is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.city',                  'City is required' ).not().isEmpty(),
            check( 'address.city',                  'City is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.state',                 'State is required' ).not().isEmpty(),
            check( 'address.state',                 'State is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.country',               'Country is required' ).not().isEmpty(),
            check( 'address.country',               'Country is string type and less of 255 characters' ).isString().isLength({ max:255 }),
            check( 'address.zip_code',              'Zip code is required' ).not().isEmpty(),
            check( 'address.zip_code',              'Zip code isn\'t a integer' ).isInt(),
            check( 'address.zip_code',              'Zip code must be a valid US postal code' ).isPostalCode( 'US' ),
            DataValidate
        ],
        UserController.updateUser
    )

    .delete(
        '/delete',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            query( 'uuid' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        UserController.deleteUser
    )

    .get(
        '/email',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            query( 'email' ).isEmail().withMessage( 'The param isn\'t an email' ),
            DataValidate
        ],
        UserController.getUserByEmail
    )

    .get(
        '/uuid',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            query( 'uuid' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
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