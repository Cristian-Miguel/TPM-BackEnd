const { Router } = require('express');
const { check, query, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const AddressServiceController = require( '../../application/controller/AddressServiceController' );

const router = Router();

router
    .post(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
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
            
            check( 'uuid_service',  'UUID service is required' ).not().isEmpty(),
            check( 'uuid_service',  'UUID service isn\'t a uuid type' ).isUUID(),
            DataValidate
        ],
        AddressServiceController.createAddressService
    )
    
    .put(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check( 'uuid_address_service',  'UUID address service is required' ).not().isEmpty(),
            check( 'uuid_address_service',  'UUID address service isn\'t an UUID type' ).isUUID(),

            check( 'street',                'Street is required' ).not().isEmpty(),
            check( 'street',                'Street isn\'t a string type' ).isString(),
            check( 'street',                'Street must be less than 255 characters' ).isLength({ max:255 }),

            check( 'city',                  'City is required' ).not().isEmpty(),
            check( 'city',                  'City isn\'t a string type' ).isString(),
            check( 'city',                  'City must be less than 255 characters' ).isLength({ max:255 }),

            check( 'state',                 'State is required' ).not().isEmpty(),
            check( 'state',                 'State isn\'t a string type' ).isString(),
            check( 'state',                 'State must be less than 255 characters' ).isLength({ max:255 }),

            check( 'zip_code',              'Zip code is required' ).not().isEmpty(),
            check( 'zip_code',              'Zip code isn\'t a numeric type' ).isNumeric(),
            check( 'zip_code',              'Zip code must be less than 6 number' ).isLength({ max:6 }),

            check( 'country',               'Country is required' ).not().isEmpty(),
            check( 'country',               'Country isn\'t a string type' ).isString(),
            check( 'country',               'Country must be less than 255 characters' ).isLength({ max:255 }),
            
            check( 'uuid_service',          'Id service is required' ).not().isEmpty(),
            check( 'uuid_service',          'Id service isn\'t a uuid type' ).isUUID(),
            DataValidate
        ],
        AddressServiceController.updateAddressService
    )

    .delete(
        '/admin',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            query( 'uuid_address_service' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        AddressServiceController.deleteAddressServiceAsAdmin
    )

    .get(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            query( 'uuid_address_service' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        AddressServiceController.deleteAddressServiceAsUser
    )

    .post(
        '/pagination',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check( 'page', 'Page is required' ).not().isEmpty(),
            check( 'page', 'Page is required' ).isNumeric(),
            check( 'size', 'Size is required' ).not().isEmpty(),
            check( 'size', 'Size is required' ).isNumeric(),
            
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
        AddressServiceController.getAddressServicePagination
    )

    .get(
        '',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            query( 'uuid_address_service' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        AddressServiceController.getAddressServiceByUuid
    );

module.exports = router;