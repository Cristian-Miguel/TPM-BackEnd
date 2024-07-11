const { response, request } = require( 'express' );//it's redundant
const { get_JWT } = require('../helpers/JWT');
const { prisma } = require('../database');
const Response_Code_Message = require('../helpers/constant/Response_Code_Message');
const winston = require('winston');
require('../helpers/Logger');

const hotel_create = async ( { body }, res = response ) => {
    try {
        
        const result = await prisma.$transaction(async (prisma) => {
            const hotel = await prisma.tbl_hotel.create({
                data: {
                    name:           body.name,
                    description:    body.description,
                    main_image:     body.main_image,
                    id_categoria:   body.category,
                    rating:         0.0,
                    id_user:        body.user,
                    date_create:    new Date().toISOString(),
                    last_update:    new Date().toISOString(),
                    phone_number:   body.phone_number,
                    email:          body.email,
                    website:        body.webside,
                    open_hour:      body.open_hour,
                    close_hour:     body.close_hour,
                }
            });

            const service = await prisma.tbl_service.create({
                data: {
                    service_type:          prisma.service_type.HOTEL,
                    id_relation_product:   hotel.uuid_hotel
                }
            });

            return service;
        });

        return res.status(201).json({
            success: true,
            uuid: result.id_relation_product,
            msg: Response_Code_Message.CODE_201
        })

    } catch (error) {
        const auth_logger = winston.loggers.get('ProductsLogger');
        auth_logger.error(`Error in the sign up: ${error}`);
        
        return response.status(500).json({
            success: false,
            error: Response_Code_Message.CODE_500(),
            stack: error,
        })
    }
}

const hotel_delete = async ( { body }, res = response ) => {
    try {
        
        const result = await prisma.$transaction(async (prisma) => {

            const hotel = await prisma.tbl_hotel.delete({
                where: {
                    uuid_hotel: body.uuid_hotle
                }
            });

            const service = await prisma.tbl_service.delete({
                where: {
                    id_relation_product:   hotel.uuid_hotel
                }
            });

            return hotel;
        });

        return res.status(200).json({
            success: true,
            uuid: result.id_relation_product,
            msg: Response_Code_Message.CODE_200
        });

    } catch (error) {
        const auth_logger = winston.loggers.get('ProductsLogger');
        auth_logger.error(`Error in the sign up: ${error}`);
        
        return response.status(500).json({
            success: false,
            error: Response_Code_Message.CODE_500(),
            stack: error
        })
    }
}

const hotel_update = async ( { body }, res = response ) => {
    try {

        const result = await prisma.$transaction(async (prisma) => {
            const hotel = await prisma.tbl_hotel.update({
                data: {
                    name:           body.name,
                    description:    body.description,
                    main_image:     body.main_image,
                    id_categoria:   body.category,
                    rating:         0.0,
                    id_user:        body.user,
                    date_create:    new Date().toISOString(),
                    last_update:    new Date().toISOString(),
                    phone_number:   body.phone_number,
                    email:          body.email,
                    website:        body.webside,
                    open_hour:      body.open_hour,
                    close_hour:     body.close_hour,
                },
                where: {
                    uuid_hotel: body.uuid_hotel
                }
            });

            return hotel;
        });

        return res.status(201).json({
            success: true,
            uuid: result.id_relation_product,
            msg: Response_Code_Message.CODE_201
        });

    } catch (error) {
        const auth_logger = winston.loggers.get('ProductsLogger');
        auth_logger.error(`Error in the sign up: ${error}`);
        
        return response.status(500).json({
            success: false,
            error: Response_Code_Message.CODE_500()
        })
    }
}

module.exports = {
    hotel_create,
    hotel_delete,
    hotel_update
}