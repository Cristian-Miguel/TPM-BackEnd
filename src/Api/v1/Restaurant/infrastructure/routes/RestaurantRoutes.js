const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const RestaurantController = require( '../../application/controller/RestaurantController' );

const router = Router();

router
    .post(
        '/create',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check( 'name',                      'Name is empty' ).not().isEmpty(),
            check( 'name',                      'Name isn\'t alphanumeric type' ).isAlphanumeric(),
            check( 'description',               'Description is empty' ).not().isEmpty(),
            check( 'description',               'Description isn\'t string type' ).isString(),
            check( 'main_image',                'Main image is empty' ).not().isEmpty(),
            check( 'main_image',                'Main image isn\'t url type' ).isURL(),
            check( 'uuid_user',                 'Uuid user is empty' ).not().isEmpty(),
            check( 'uuid_user',                 'Uuid user isn\'t a uuid type' ).isUUID(),
            check( 'id_restaurant_category',    'id restaurant category is empty' ).not().isEmpty(),
            check( 'id_restaurant_category',    'id restaurant category isn\'t a numeric type' ).isNumeric(),
            body('email')
                .optional({ checkFalsy: true })  // This allows the field to be empty
                .trim()
                .isEmail().withMessage('Must be a valid email address'),
            body('phone_number')
                .optional({ checkFalsy: true })  // This allows the field to be empty
                .trim()
                .isMobilePhone().withMessage('Must be a valid mobile phone number'),
            body('webside')
                .optional({ checkFalsy: true })  // This allows the field to be empty
                .trim()
                .isURL().withMessage('Must be a valid url.'),
            check( 'open_hour',                 'Open hour is empty' ).not().isEmpty(),
            check( 'open_hour',                 'Open hour isn\'t hour format hh:mm:ss' ).isTime(),
            check( 'close_hour',                'Close hour is empty' ).not().isEmpty(),
            check( 'close_hour',                'Close hour isn\'t hour format hh:mm:ss' ).isTime(),
            check( 'street',                    'Street is required' ).not().isEmpty(),
            check( 'street',                    'Street isn\'t a string type' ).isString(),
            check( 'street',                    'Street must be less than 255 characters' ).isLength({ max:255 }),
            check( 'city',                      'City is required' ).not().isEmpty(),
            check( 'city',                      'City isn\'t a string type' ).isString(),
            check( 'city',                      'City must be less than 255 characters' ).isLength({ max:255 }),
            check( 'state',                     'State is required' ).not().isEmpty(),
            check( 'state',                     'State isn\'t a string type' ).isString(),
            check( 'state',                     'State must be less than 255 characters' ).isLength({ max:255 }),
            check( 'zip_code',                  'Zip code is required' ).not().isEmpty(),
            check( 'zip_code',                  'Zip code isn\'t a numeric type' ).isNumeric(),
            check( 'zip_code',                  'Zip code must be less than 6 number' ).isLength({ max:6 }),
            check( 'country',                   'Country is required' ).not().isEmpty(),
            check( 'country',                   'Country isn\'t a string type' ).isString(),
            check( 'country',                   'Country must be less than 255 characters' ).isLength({ max:255 }),
            DataValidate
        ],
        RestaurantController.createRestaurant
    )

    .post(
        '/update',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            
            check( 'uuid_restaurant',           'Uuid restaurant is empty' ).not().isEmpty(),
            check( 'uuid_restaurant',           'Uuid restaurant isn\'t a uuid type' ).isUUID(),
            check( 'name',                      'Name is empty' ).not().isEmpty(),
            check( 'name',                      'Name isn\'t alphanumeric type' ).isAlphanumeric(),
            check( 'description',               'Description is empty' ).not().isEmpty(),
            check( 'description',               'Description isn\'t string type' ).isString(),
            check( 'main_image',                'Main image is empty' ).not().isEmpty(),
            check( 'main_image',                'Main image isn\'t url type' ).isURL(),
            check( 'uuid_user',                 'Uuid user is empty' ).not().isEmpty(),
            check( 'uuid_user',                 'Uuid user isn\'t a uuid type' ).isUUID(),
            check( 'id_restaurant_category',    'id restaurant category is empty' ).not().isEmpty(),
            check( 'id_restaurant_category',    'id restaurant category isn\'t a numeric type' ).isNumeric(),
            body('email')
                .optional({ checkFalsy: true })  // This allows the field to be empty
                .trim()
                .isEmail().withMessage('Must be a valid email address'),
            body('phone_number')
                .optional({ checkFalsy: true })  // This allows the field to be empty
                .trim()
                .isMobilePhone().withMessage('Must be a valid mobile phone number'),
            body('webside')
                .optional({ checkFalsy: true })  // This allows the field to be empty
                .trim()
                .isURL().withMessage('Must be a valid url.'),
            check( 'open_hour',                 'Open hour is empty' ).not().isEmpty(),
            check( 'open_hour',                 'Open hour isn\'t hour format hh:mm:ss' ).isTime(),
            check( 'close_hour',                'Close hour is empty' ).not().isEmpty(),
            check( 'close_hour',                'Close hour isn\'t hour format hh:mm:ss' ).isTime(),
            check( 'street',                    'Street is required' ).not().isEmpty(),
            check( 'street',                    'Street isn\'t a string type' ).isString(),
            check( 'street',                    'Street must be less than 255 characters' ).isLength({ max:255 }),
            check( 'city',                      'City is required' ).not().isEmpty(),
            check( 'city',                      'City isn\'t a string type' ).isString(),
            check( 'city',                      'City must be less than 255 characters' ).isLength({ max:255 }),
            check( 'state',                     'State is required' ).not().isEmpty(),
            check( 'state',                     'State isn\'t a string type' ).isString(),
            check( 'state',                     'State must be less than 255 characters' ).isLength({ max:255 }),
            check( 'zip_code',                  'Zip code is required' ).not().isEmpty(),
            check( 'zip_code',                  'Zip code isn\'t a numeric type' ).isNumeric(),
            check( 'zip_code',                  'Zip code must be less than 6 number' ).isLength({ max:6 }),
            check( 'country',                   'Country is required' ).not().isEmpty(),
            check( 'country',                   'Country isn\'t a string type' ).isString(),
            check( 'country',                   'Country must be less than 255 characters' ).isLength({ max:255 }),

            DataValidate
        ],
        RestaurantController.updateRestaurant
    )

    .get(
        '/delete/seller/:uuid_restaurant',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            
            param( 'uuid_restaurant' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
                
            DataValidate
        ],
        RestaurantController.deleteAsSeller
    )

    .get(
        '/delete/admin/:uuid_restaurant',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            param( 'uuid_restaurant' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
                
            DataValidate
        ],
        RestaurantController.deleteAsAdmin
    )

    .get(
        '/get/:uuid_restaurant',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            
            param( 'uuid_restaurant' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
                
            DataValidate
        ],
        RestaurantController.getRestaurantByUuid
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
        RestaurantController.getRestaurantPagination
    );

module.exports = router;
