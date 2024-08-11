const { response, request } = require( 'express' );//it's redundant
const ServiceRepository = require( '../../domain/repository/PrismaServiceRepository' );
const ServiceService = require( '../../domain/service/ServiceService' );
const ResponseCodeMessage = require( '../../../Shared/infrastructure/constant/ResponseCodeMessage' );
const PrismaError = require('../../../Shared/domain/database/PrismaErrorHandler');

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
         
        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

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
        
        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async updateService( req = request, res = response ) {

        try {
            const result = await serviceService.deleteServiceAsSeller( req.body );

            return res.status(200).json({
                success: true,
                id_relation_product: result.id_relation_product,
                msg: ResponseCodeMessage.CODE_200
            });
         
        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async getServiceByService( req = request, res = response ) {

        try {
            const result = await serviceService.getServiceByService( req.params );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
        
        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

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
        
        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

    async getServicePagination( req = request, res = response ) {

        try {
            const result = await serviceService.getServicePagination( req.body );

            return res.status(200).json({
                success: true,
                data: result,
                msg: ResponseCodeMessage.CODE_200
            });
        
        } catch( error ) {
            if( error instanceof PrismaError ) {
                const { messageApiClient } = error;
            
                return res.status(500).json({
                    success: false,
                    message: messageApiClient,
                    error: ResponseCodeMessage.CODE_500
                });

            } else {
                return res.status(500).json({
                    success: false,
                    message: "Server data process error",
                    error: ResponseCodeMessage.CODE_500
                });
            }

        }
        
    }

}

module.exports = new ServiceController();