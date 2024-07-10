const { Router, request } = require('express');
const { check, body } = require('express-validator');
const { Data_Validate } = require('../middlewares/Data_Validate');
const Auth_Controller = require('../controllers/Auth_Controller');
const { Validate_Token } = require('../middlewares/Validate_JWT');
const router = Router()

//get all the 
router
    .get(
        '/products',
        [
            Validate_Token,
            Data_Validate
        ],
        
    );