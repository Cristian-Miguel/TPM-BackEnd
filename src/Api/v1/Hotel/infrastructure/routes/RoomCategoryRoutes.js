const { Router } = require('express');
const { check, param } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const ValidateRoles = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const router = Router();
const RoomCategoryController = require( '../../application/controller/RoomCategoryControlle' );

router
    .post(
        '/create',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            check( 'description', 'Description is required' ).not().isEmpty(),
            check( 'description', 'Description isn\'t is a string type' ).isString(),
            check( 'description', 'Description is less than 255 characters' ).isLength({ max: 255 }),
            check( 'number_beds', 'Number of bed is required' ).not().isEmpty(),
            check( 'number_beds', 'Number of bed isn\'t a numeric type' ).isNumeric(),
            check( 'max_people', 'Max of people is required' ).not().isEmpty(),
            check( 'max_people', 'Max of people isn\'t a numeric type' ).isNumeric(),
            check( 'cost', 'Cost is required' ).not().isEmpty(),
            check( 'cost', 'Cost isn\'t a decimal type' ).isDecimal(),
            check( 'discount_cash', 'Discount cash is required' ).not().isEmpty(),
            check( 'discount_cash', 'Discount cash isn\'t a decimal type' ).isDecimal(),
            check( 'discount_percentage', 'Discount percentage is required' ).not().isEmpty(),
            check( 'discount_percentage', 'Discount percentage isn\'t a decimal type' ).isDecimal(),
            DataValidate
        ],
        RoomCategoryController.createRoomCategory
    )

    .post(
        '/update',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            check( 'description', 'Description is required' ).not().isEmpty(),
            check( 'description', 'Description isn\'t is a string type' ).isString(),
            check( 'description', 'Description is less than 255 characters' ).isLength({ max: 255 }),
            check( 'number_beds', 'Number of bed is required' ).not().isEmpty(),
            check( 'number_beds', 'Number of bed isn\'t a numeric type' ).isNumeric(),
            check( 'max_people', 'Max of people is required' ).not().isEmpty(),
            check( 'max_people', 'Max of people isn\'t a numeric type' ).isNumeric(),
            check( 'cost', 'Cost is required' ).not().isEmpty(),
            check( 'cost', 'Cost isn\'t a decimal type' ).isDecimal(),
            check( 'discount_cash', 'Discount cash is required' ).not().isEmpty(),
            check( 'discount_cash', 'Discount cash isn\'t a decimal type' ).isDecimal(),
            check( 'discount_percentage', 'Discount percentage is required' ).not().isEmpty(),
            check( 'discount_percentage', 'Discount percentage isn\'t a decimal type' ).isDecimal(),
            DataValidate
        ],
        RoomCategoryController.updateRoomCategory
    )

    .get(
        '/delete/:id_hotel_room_category',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            param( 'id_hotel_room_category' )
                .notEmpty().withMessage( 'The id param is required' )
                .isNumeric().withMessage( 'The param id isn\'t a numeric type' ),
            DataValidate
        ],
        RoomCategoryController.deleteRoomCategory
    )

    .post(
        '/pagination',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
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
        RoomCategoryController.getRoomCategoryPagination
    )

    .get(
        '/:id_hotel_room_category',
        [
            ValidateJwt.validateToken,
            ValidateRoles.accessRol( AdminRol ),
            param( 'id_hotel_room_category' )
                .notEmpty().withMessage( 'The id param is required' )
                .isNumeric().withMessage( 'The param id isn\'t a numeric type' ),
            DataValidate
        ],
        RoomCategoryController.getRoomCategoryById
    );

module.exports = router;