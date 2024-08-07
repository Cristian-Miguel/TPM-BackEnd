const { Router } = require('express');
const { check, param, body } = require( 'express-validator' );
const { DataValidate } = require( '../../../Shared/infrastructure/middleware/DataValidate' );
const { accessRol } = require( '../../../Validation/infrastructure/ValidateRoles' );
const ValidateJwt = require( '../../../Validation/infrastructure/ValidateJwt' );
const ValidationCustomJsonField = require( '../../../Validation/infrastructure/ValidationCustomJsonField' );
const { AdminRol, SellerRol } = require( '../../../Shared/infrastructure/constant/SystemConstant' );
const RestaurantTableController = require( '../../application/controller/RestaurantTableController' );

const router = Router();

router.post(
    '/upload/excel'
    [
        ValidateJwt.validateToken,
        accessRol( AdminRol, SellerRol ),
        check('uuid_restaurant', 'Uuid restaurant is required').notEmpty(),
        check('uuid_restaurant', 'Uuid restaurant is a uuid type').isUUID(),
        body('file').custom( ValidationCustomJsonField.validateFile ),
        DataValidate
    ],
    RestaurantTableController.createTablesExtractingExcelData
);

module.exports = router;