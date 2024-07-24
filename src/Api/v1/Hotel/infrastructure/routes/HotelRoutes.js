const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const router = Router();
const HotelController = require( '../../application/controller/HotelController' );

router
    .post(
        '/create',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check( 'name',          'Name is required' ).not().isEmpty(),
            check( 'description',   'Description is required' ),
            check( 'main_image',    'Main image is required' ),
            check( 'id_category',   'Name is required' ),
            check( 'uuid_user',     'Id user is required' ),
            check( 'phone_number',  'Phone number is required' ),
            check( 'email',         'Email is required' ),
            check( 'webside',       'Webside is required' ),
            check( 'open_hour',     'Open hour is required' ),
            check( 'close_hour',    'Close hour is required' ),
            DataValidate
        ],
        HotelController.createHotel
    )

    .post(
        '/update',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check( 'uuid_hotel',    'Uuid is required' ).not().isEmpty(),
            check( 'uuid_hotel',    'It isn\'t an uuid' ).isUUID(),
            check( 'name',          'Name is required' ).not().isEmpty(),
            check( 'name',          'Name field must be less than 100 characters' ).isString().isLength({ max: 100 }),
            check( 'description',   'Description is required' ).not().isEmpty(),
            check( 'description',   'Description field must be less than 150 characters' ).isString().isLength({ max: 150 }),
            check( 'main_image',    'Main image is required' ).not().isEmpty(),
            check( 'main_image',    'Main image isn\'t url' ).isURL(),
            check( 'id_category',   'Id category is required' ).not().isEmpty(),
            check( 'id_category',   'Id category field isn\'t a numeric type' ).isNumeric(),
            check( 'uuid_user',     'Uuid user is required' ).not().isEmpty(),
            check( 'uuid_user',     'Uuid user field isn\'t a uuid type' ).isUUID(),
            check( 'phone_number',  'Phone number is required' ).not().isEmpty(),
            check( 'phone_number',  'Phone number field isn\'t a mobile phone type' ).isMobilePhone(),
            check( 'email',         'Email is required' ).not().isEmpty(),
            check( 'email',         'Email field isn\'t a email type' ).isEmail(),
            check( 'webside',       'Webside is required' ).not().isEmpty(),
            check( 'webside',       'Webside field isn\'t a url type' ).isURL(),
            check( 'open_hour',     'Open hour is required' ).not().isEmpty(),
            check( 'open_hour',     'Open hour field isn\'t ' ).not().isEmpty(),
            check( 'close_hour',    'Close hour is required' ).not().isEmpty(),
            check( 'close_hour',    'Close hour is required' ).not().isEmpty(),
            DataValidate
        ],
        HotelController.updateHotel
    )

    .get(
        '/delete/admin/:uuid',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            param( 'uuid' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        HotelController.deleteHotelAdmin
    )

    .get(
        '/delete/seller/:uuid',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            param( 'uuid' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        HotelController.deleteHotelSeller
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
        HotelController.getHotelPagination
    )

    .get(
        '/:uuid',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            param( 'uuid' ).isUUID().withMessage( 'The param isn\'t an uuid' ),
            DataValidate
        ],
        HotelController.getHotelByUuid
    )


module.exports = router;