const { response, request } = require( 'express' );//it's redundant
const ServiceRepository = require( '../../domain/repository/PrismaServiceRepository' );
const ServiceService = require( '../../domain/service/ServiceService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const winston = require( 'winston' );
require( '../../../Shared/infrastructure/Log/Logger' );

const serviceService = new ServiceService( ServiceRepository );

class ServiceController {

    async createService ( req = request, res = response ) {
        try {

            const result = await serviceService.createService( req.body );

            return res.status(201).json({
                success: true,
                id_relation_product: result.id_relation_product,
                msg: ResponseCodeMessage.CODE_201
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to create a service: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async deleteServiceAsAdmin( req = request, res = response ) {
        try {

            const result = await serviceService.deleteServiceAsAdmin( req.params );

            return res.status(200).json({
                success: true,
                id_relation_product: result.id_relation_product,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to hard delete a service: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async updateService( req = request, res = response ){
        try {

            const result = await serviceService.deleteServiceAsSeller( req.body );

            return res.status(200).json({
                success: true,
                id_relation_product: result.id_relation_product,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to update a service: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getServiceByService( req = request, res = response ){
        try {

            const result = await serviceService.getServiceByService( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a list of services: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getServiceByUuid( req = request, res = response ){
        try {

            const result = await serviceService.getServiceByUuid( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a service by uuid: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

    async getServicePagination( req = request, res = response ){
        try {

            const result = await serviceService.getServicePagination( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
            
        } catch (error) {
            
            const products_logger = winston.loggers.get('ProductsLogger');
            products_logger.error(`Error try to get a pagination of service: ${ error }`);
            
            return res.status(500).json({
                success: false,
                error: Response_Code_Message.CODE_500(),
                stack: error
            });
        }
    }

}

module.exports = new ServiceController();