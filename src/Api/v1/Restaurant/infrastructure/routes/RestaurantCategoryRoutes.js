const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const RestaurantCategoryController = require( '../../application/controller/RestaurantCategoryController' );

const router = Router();

router
    .post(
        '/create',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            check( 'description', 'Description is empty' ).not().isEmpty(),
            check( 'description', 'Description isn\'t a string type' ).isString(),
            check( 'description', 'Description have a max of 255 characters' ).isLength({ max:255 }),

            DataValidate
        ],
        RestaurantCategoryController.createCategory
    )

    .post(
        '/update',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            check( 'id_restaurant_category', 'Id restaurant category is empty' ).not().isEmpty(),
            check( 'id_restaurant_category', 'Id restaurant category isn\'t a numeric type' ).isNumeric(),
            check( 'description', 'Description is empty' ).not().isEmpty(),
            check( 'description', 'Description isn\'t a string type' ).isString(),
            check( 'description', 'Description have a max of 255 characters' ).isLength({ max:255 }),

            DataValidate
        ],
        RestaurantCategoryController.updateCategory
    )

    .get(
        '/delete/:id_restaurant_category',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            param( 'id_restaurant_category' )
                .notEmpty().withMessage( 'Id restaurant category is required' )
                .isNumeric().withMessage( 'The param isn\'t a numeric type' ),
                
            DataValidate
        ],
        RestaurantCategoryController.deleteCategory
    )

    .get(
        '/get/:id_restaurant_category',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            param( 'id_restaurant_category' )
                .notEmpty().withMessage( 'Id restaurant category is required' )
                .isNumeric().withMessage( 'The param isn\'t a numeric type' ),
                
            DataValidate
        ],
        RestaurantCategoryController.getCategoryById
    )

    .post(
        '/pagination',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
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
        RestaurantCategoryController.getCategoryPagination
    );

module.exports = router;