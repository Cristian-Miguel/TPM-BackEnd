const { response, request } = require( 'express' );//it's redundant
const { get_JWT } = require('../helpers/JWT');
const { prisma } = require('../database');
const Response_Code_Message = require('../helpers/constant/Response_Code_Message');
const winston = require('winston');
require('../helpers/Logger');

const product_pagination = async ( req = request, res = response ) => {
    try {
        
        const body = req.body;
        const page = body.page - 1 ;
        const limit = body.limit;
        const type = body.type;
        const filters = body.filters;
        const orderby = body.orderby;

        if(type !== null){

        } else {

        }

    } catch (error) {
        const auth_logger = winston.loggers.get('AuthLogger');
        auth_logger.error(`Error in the sign in: ${error}`);

        return response.status(500).json({
            success: false,
            error: Response_Code_Message.CODE_500()
        })
    }
}

const product_information = async ( req = request, res = response ) => {

}

