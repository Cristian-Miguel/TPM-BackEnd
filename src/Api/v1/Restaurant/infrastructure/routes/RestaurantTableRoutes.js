const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const RestaurantTableController = require( '../../application/controller/RestaurantTableController' );
const { upload } = require('../../../Shared/infrastructure/multer/multerConfig');

const router = Router();

router
    .post(
        '/create',
        upload.none(),
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check('number_people', 'Number of people is required').notEmpty(),
            check('number_people', 'Number of people is a numeric type').isNumeric(),
            check('cost', 'Cost is a uuid type').notEmpty(),
            check('cost', 'Cost is a decimal type').isDecimal(),
            check('date_reservation', 'Date reservation is required').notEmpty(),
            check('date_reservation', 'Date reservation is date type').isISO8601(),
            check('type_reservation', 'Type reservation is required').notEmpty(),
            check('type_reservation', 'Type reservation is string type').isString(),
            check('discount_cash', 'Discount cash is a uuid type').notEmpty(),
            check('discount_cash', 'Discount cash is a decimal type').isDecimal(),
            check('discount_percentage', 'Discount percentage is a uuid type').notEmpty(),
            check('discount_percentage', 'Discount percentage is a decimal type').isDecimal(),
            check('uuid_restaurant', 'Uuid restaurant is required').notEmpty(),
            check('uuid_restaurant', 'Uuid restaurant is a uuid type').isUUID(),
            check('reserved', 'Reservated is required').notEmpty(),
            check('reserved', 'Reservated is a boolean type').isBoolean(),
            DataValidate
        ],
        RestaurantTableController.createTable
    )

    .post(
        '/upload/excel',
        upload.single('file'),
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check('uuid_restaurant', 'Uuid restaurant is required').notEmpty(),
            check('uuid_restaurant', 'Uuid restaurant is a uuid type').isUUID(),
            body('file').custom( ValidationCustomJsonField.validateFile ),
            DataValidate
        ],
        RestaurantTableController.createTablesExtractingExcelData
    )

    .post(
        '/upload/csv',
        upload.single('file'),
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check('uuid_restaurant', 'Uuid restaurant is required').notEmpty(),
            check('uuid_restaurant', 'Uuid restaurant is a uuid type').isUUID(),
            body('file').custom( ValidationCustomJsonField.validateFile ),
            DataValidate
        ],
        RestaurantTableController.createTablesExtractingCSVData
    )

    .post(
        '/update',
        upload.none(),
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            check('id_restaurant_table', 'Id restaurant table is required').notEmpty(),
            check('id_restaurant_table', 'Id restaurant table is a numeric type').isNumeric(),
            check('number_people', 'Number of people is required').notEmpty(),
            check('number_people', 'Number of people is a numeric type').isNumeric(),
            check('cost', 'Cost is a uuid type').notEmpty(),
            check('cost', 'Cost is a decimal type').isDecimal(),
            check('date_reservation', 'Date reservation is required').notEmpty(),
            check('date_reservation', 'Date reservation is date type').isISO8601(),
            check('type_reservation', 'Type reservation is required').notEmpty(),
            check('type_reservation', 'Type reservation is string type').isString(),
            check('discount_cash', 'Discount cash is a uuid type').notEmpty(),
            check('discount_cash', 'Discount cash is a decimal type').isDecimal(),
            check('discount_percentage', 'Discount percentage is a uuid type').notEmpty(),
            check('discount_percentage', 'Discount percentage is a decimal type').isDecimal(),
            check('uuid_restaurant', 'Uuid restaurant is required').notEmpty(),
            check('uuid_restaurant', 'Uuid restaurant is a uuid type').isUUID(),
            check('reserved', 'Reservated is required').notEmpty(),
            check('reserved', 'Reservated is a boolean type').isBoolean(),
            DataValidate
        ],
        RestaurantTableController.updateTable
    )

    .get(
        '/delete/:id_restaurant_table',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            
            param( 'id_restaurant_table' )
                .notEmpty().withMessage( 'Id restaurant table is required' )
                .isNumeric().withMessage( 'The param is a numeric type' ),
                
            DataValidate
        ],
        RestaurantTableController.deleteTable
    )

    .post(
        '/delete/list',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            check( 'listIds', 'List id must be an array' ).isArray(),
            body( 'listIds.*.id_restaurant_table' )
                .notEmpty().withMessage( 'id restaurant table in listIds array is required' )
                .isNumeric().withMessage( 'id restaurant table in listIds array must be an numeric type' ),
            DataValidate
        ],
        RestaurantTableController.deleteTables
    )

    .get(
        '/get/:id_restaurant_table',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            
            param( 'id_restaurant_table' )
                .notEmpty().withMessage( 'Id restaurant table is required' )
                .isNumeric().withMessage( 'The param is a numeric type' ),
                
            DataValidate
        ],
        RestaurantTableController.getTableById
    )
    
    .get(
        '/get/:uuid_restaurant',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol, SellerRol ),
            
            param( 'uuid_restaurant' )
                .notEmpty().withMessage( 'Uuid restaurant is required' )
                .isNumeric().withMessage( 'The param is a uuid type' ),
                
            DataValidate
        ],
        RestaurantTableController.getTablesByRestaurant
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
        RestaurantTableController.getTablesPagination
    );

module.exports = router;