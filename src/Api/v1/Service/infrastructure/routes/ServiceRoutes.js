const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const ServiceController = require( '../../application/controller/ServiceController' );

const router = Router();

router
    .post(
        '/create',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            check( 'service_type', 'Service type is empty' ).not().isEmpty(),

            DataValidate
        ],
        ServiceController.createService
    )

    .post(
        '/update',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),

            check( 'service_type', 'Service type is empty' ).not().isEmpty(),

            DataValidate
        ],
        ServiceController.updateService
    )

    .get(
        '/delete/admin/:id_relation_product',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            param( 'id_relation_product' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
                
            DataValidate
        ],
        ServiceController.deleteServiceAsSeller
    )

    .get(
        '/get/:service',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            param( 'service_type' )
                .notEmpty().withMessage( 'Service type is required' ),

            DataValidate
        ],
        ServiceController.getServiceByService
    )

    .get(
        '/get/:id_relation_product',
        [
            ValidateJwt.validateToken,
            accessRol( AdminRol ),
            
            param( 'id_relation_product' )
                .notEmpty().withMessage( 'Uuid is required' )
                .isUUID().withMessage( 'The param isn\'t an uuid' ),
                
            DataValidate
        ],
        ServiceController.createService
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
        ServiceController.getServicePagination
    );

module.exports = router;