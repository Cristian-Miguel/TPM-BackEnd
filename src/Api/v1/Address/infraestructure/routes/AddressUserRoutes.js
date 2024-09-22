const { Router } = require('express');
const { check, query, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, SellerRol, UserRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const AddressUserController = require( '../../application/controller/AddressUserController' );

const router = Router();

/**
 * This module handles the routing for user addresses.
 * It includes endpoints for creating, updating, deleting and retrieve user addresses.
 * 
 * @module AddressUserRoutes
 */

router
    /**
     * @api {post} /api/v1/address_user Post a new user address.
     * @apiDescription Create the address of a user based on the provided object.
     * @apiParam {object} adress - The fields necessary to create the address.
     * @apiSuccess {string} UUID - The user address UUID.
     * @apiError {400} BadRequest Invalid param format. 
     */
    .post(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol, UserRol ),
            check( 'street',        'Street is required' ).not().isEmpty(),
            check( 'street',        'Street isn\'t a string type' ).isString(),
            check( 'street',        'Street must be less than 255 characters' ).isLength({ max:255 }),

            check( 'city',          'City is required' ).not().isEmpty(),
            check( 'city',          'City isn\'t a string type' ).isString(),
            check( 'city',          'City must be less than 255 characters' ).isLength({ max:255 }),

            check( 'state',         'State is required' ).not().isEmpty(),
            check( 'state',         'State isn\'t a string type' ).isString(),
            check( 'state',         'State must be less than 255 characters' ).isLength({ max:255 }),

            check( 'zip_code',      'Zip code is required' ).not().isEmpty(),
            check( 'zip_code',      'Zip code isn\'t a numeric type' ).isNumeric(),
            check( 'zip_code',      'Zip code must be less than 6 number' ).isLength({ max:6 }),

            check( 'country',       'Country is required' ).not().isEmpty(),
            check( 'country',       'Country isn\'t a string type' ).isString(),
            check( 'country',       'Country must be less than 255 characters' ).isLength({ max:255 }),
            
            check( 'uuid_user',    'Uuid user is required' ).not().isEmpty(),
            check( 'uuid_user',    'Uuid user isn\'t an uuid type' ).isUUID(),
            DataValidate
        ],
        AddressUserController.createAddressUser
    )
    
    .put(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol, UserRol ),
            check( 'uuid_address_user',  'UUID is required' ).not().isEmpty(),
            check( 'uuid_address_user',  'UUID address user isn\'t a uuid format' ).isUUID(),

            check( 'street',             'Street is required' ).not().isEmpty(),
            check( 'street',             'Street isn\'t a string type' ).isString(),
            check( 'street',             'Street must be less than 255 characters' ).isLength({ max:255 }),

            check( 'city',               'City is required' ).not().isEmpty(),
            check( 'city',               'City isn\'t a string type' ).isString(),
            check( 'city',               'City must be less than 255 characters' ).isLength({ max:255 }),

            check( 'state',              'State is required' ).not().isEmpty(),
            check( 'state',              'State isn\'t a string type' ).isString(),
            check( 'state',              'State must be less than 255 characters' ).isLength({ max:255 }),

            check( 'zip_code',           'Zip code is required' ).not().isEmpty(),
            check( 'zip_code',           'Zip code isn\'t a numeric type' ).isNumeric(),
            check( 'zip_code',           'Zip code must be less than 6 number' ).isLength({ max:6 }),

            check( 'country',            'Country is required' ).not().isEmpty(),
            check( 'country',            'Country isn\'t a string type' ).isString(),
            check( 'country',            'Country must be less than 255 characters' ).isLength({ max:255 }),
            
            check( 'uuid_user',          'Uuid user is required' ).not().isEmpty(),
            check( 'uuid_user',          'Uuid user isn\'t an uuid type' ).isUUID(),
            DataValidate
        ],
        AddressUserController.updateAddressUser
    )

    .delete(
        '/admin',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            query( 'uuid_address_user' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        AddressUserController.deleteAddressUserAsAdmin
    )

    .delete(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol, UserRol ),
            query( 'uuid_address_user' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        AddressUserController.deleteAddressUserAsUser
    )

    .post(
        '/pagination',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check( 'page', 'Page is required' ).not().isEmpty(),
            check( 'page', 'Page is int type and greater than 0' ).isInt({ gt:0 }),
            check( 'size', 'Size is required' ).not().isEmpty(),
            check( 'size', 'Size is a int type' ).isInt(),
            
            check( 'orderBy', 'OrderBy must be an array' ).isArray(),
            body( 'orderBy.*.order_type' )
                .notEmpty().withMessage( 'order type in orderby array is required' )
                .isString().withMessage( 'order type in orderby array must be an string type' )
                .not().custom( ValidationCustomJsonField.validateTypeOrder ),//check have only desc and asc
            body( 'orderBy.*.field' )
                .notEmpty().withMessage( 'field in orderby array is required' )
                .isString().withMessage( 'field in orderby array must be an string type' ),

            check( 'filter', 'Filter must be an array' ).isArray(),
            body( 'filter.*.filter_type' )
                .notEmpty().withMessage( 'filter type in filter array is required' )
                .isString().withMessage( 'filter type in filter array must be an string type' )
                .not().custom( ValidationCustomJsonField.validateTypeFilter ),//check have only like, gt, lt, eq 
            body( 'filter.*.field' )
                .notEmpty().withMessage( 'field in filter array is required' )
                .isString().withMessage( 'field in filter array must be an string type' ),
            body( 'filter.*.compare' )
                .notEmpty().withMessage( 'compare in filter array is required' ),
            DataValidate
        ],
        AddressUserController.getAddressUserPagination
    )

    .get(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol, UserRol ),
            query( 'uuid_address_user' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        AddressUserController.getAddressUserByUuid
    );

module.exports = router;