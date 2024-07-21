const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const ValidateRoles = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, UserRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const router = Router();
const HotelRoomController = require( '../../application/controller/HotelRoomController' );

router
    .post(
        '/create',
        [
            ValidateJwt.ValidateJwt,
            ValidateRoles.accessRol( AdminRol, SellerRol ),
            check( 'id_room_category', 'Id room category is required' ).not().isEmpty(),
            check( 'id_room_category', 'Id room category must be a numeric type' ).isNumeric(),
            check( 'number_room', 'Number room is required' ).not().isEmpty(),
            check( 'number_room', 'Number room must be a string type' ).isString(),
            check( 'uuid_hotel', 'Uuid hotel is required' ).not().isEmpty(),
            check( 'uuid_hotel', 'Uuid hotel must be an uuid type' ).isUUID(),
            DataValidate
        ],
        HotelRoomController.createRoomHotel
    )
    
    .post(
        '/createMany',
        [
            ValidateJwt.ValidateJwt,
            ValidateRoles.accessRol( AdminRol, SellerRol ),
            body( 'rooms' ).isArray().withMessage( 'rooms must be an array' ),
            body( 'rooms.*.id_room_category' )
                .notEmpty().withMessage( 'Id room category is required' )
                .isNumeric().withMessage( 'Id room category must be a numeric type' ),
            body( 'rooms.*.number_room' )
                .notEmpty().withMessage( 'Number room is required' )
                .isString().withMessage( 'Number room must be a string type' ),
            body( 'rooms.*.uuid_hotel' )
                .notEmpty().withMessage( 'Uuid hotel is required' )
                .isUUID().withMessage( 'Uuid hotel must be an uuid type' ),
            DataValidate
        ],
        HotelRoomController.createManyRoomHotel
    )

    .post(
        '/update',
        [
            ValidateJwt.ValidateJwt,
            ValidateRoles.accessRol( AdminRol, SellerRol ),
            check( 'id_hotel_room', 'Id hotel room is required' ).not().isEmpty(),
            check( 'id_hotel_room', 'Id hotel room must be a numeric type' ).isNumeric(),
            check( 'id_room_category', 'Id room category is required' ).not().isEmpty(),
            check( 'id_room_category', 'Id room category must be a numeric type' ).isNumeric(),
            check( 'number_room', 'Number room is required' ).not().isEmpty(),
            check( 'number_room', 'Number room must be a string type' ).isString(),
            check( 'uuid_hotel', 'Uuid hotel is required' ).not().isEmpty(),
            check( 'uuid_hotel', 'Uuid hotel must be an uuid type' ).isUUID(),
            DataValidate
        ],
        HotelRoomController.updateRoomHotel
    )

    .get(
        '/delete/:id_hotel_room',
        [
            ValidateJwt.ValidateJwt,
            ValidateRoles.accessRol( AdminRol, SellerRol ),
            param( 'id_hotel_room' )
                .notEmpty().withMessage( 'Id hotel room is required' )
                .not().isNumeric().withMessage( 'Id hotel room must be a numeric type' ),
            DataValidate
        ],
        HotelRoomController.deleteRoomHotel
    )

    .post(
        '/pagination',
        [
            ValidateJwt.ValidateJwt,
            ValidateRoles.accessRol( AdminRol, SellerRol, UserRol ),
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
        HotelRoomController.getRoomHotelPagination
    )

    .get(
        '/:id_hotel_room',
        [
            ValidateJwt.ValidateJwt,
            ValidateRoles.accessRol( AdminRol, SellerRol ),
            param( 'id_hotel_room' )
                .notEmpty().withMessage( 'Id hotel room is required' )
                .not().isNumeric().withMessage( 'Id hotel room must be a numeric type' ),
            DataValidate
        ],
        HotelRoomController.getRoomHotelById
    )

module.exports = router;