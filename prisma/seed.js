const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();

async function main() {
    await prisma.$transaction(async (prisma) => {
        const roles = await createRoles( prisma );
        await createUser( prisma, roles );
        await createAmenities( prisma );
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 


async function createRoles( prismaSQL ){
    //Roles created
    const rolUser = await prismaSQL.tbl_rol.create({
        data: 
        {
            name:'USER',
            description:'User generic rol'
        }
    });

    const rolSeller = await prismaSQL.tbl_rol.create({
        data: 
        {
            name:'SELLER',
            description:'Seller rol to put the service'
        }
    });

    const rolAdmin = await prismaSQL.tbl_rol.create({
        data: {
            name:'ADMINISTRATOR',
            description:'Adiministrator of the application'
        }
    });

    return [
        rolUser,
        rolSeller,
        rolAdmin
    ];
}

async function createUser( prismaSQL, roles ){

    const userUser = await prismaSQL.tbl_user.create({
        data:{
            email:"user@falseserver.com",
            username:"userProfile",
            image_profile:"/UserImage.jpg",
            password:"iH1lmYruPMEwtq7UqXQL6NbiH+hOciF7lGsYhAs8iDR173jSOd",
            first_name:"UserFirstName",
            last_name:"UserLastName",
            birth_day:"1999-04-26T00:00:00.000Z",
            token:"",
            refresh_token:"",
            last_logger: new Date().toISOString(),
            user_create: new Date().toISOString(),
            google_sign:true,
            last_update: new Date().toISOString(),
            id_rol: roles[0].id_rol,         
            active:true,
        },
    });

    const addressUser = await prismaSQL.tbl_address_user.create({
        data:{
            id_user: userUser.id_user,
            street: "street 41th 1123",
            city: "San diego",
            state: "California",
            country: "United States of America",
            zip_code: 22434,
            date_created: new Date().toISOString(),
            last_update: new Date().toISOString(),
            active:true,
        },
    });

    const userSeller = await prismaSQL.tbl_user.create({
        data:{
            email: "seller@falseserver.com",
            username: "sellerProfile",
            image_profile: "/SellerImage.jpg",
            password: "iH1lmYruPMEwtq7UqXQL6NbiH+hOciF7lGsYhAs8iDR173jSOd",
            first_name: "SellerFirstName",
            last_name: "SellerLastName",
            birth_day: "1999-05-21T00:00:00.000Z",
            token: "",
            refresh_token: "2024-07-24T00:00:00.000Z",
            last_logger: new Date().toISOString(),
            user_create: new Date().toISOString(),
            google_sign: true,
            last_update: new Date().toISOString(),
            id_rol: roles[1].id_rol,         
            active: true,
        },
    });

    const addressSeller = await prismaSQL.tbl_address_user.create({
        data:{
            id_user: userSeller.id_user,
            street: "street 21th 123",
            city: "San Antonio",
            state: "Texas",
            country: "United States of America",
            zip_code: 78015,
            date_created: new Date().toISOString(),
            last_update: new Date().toISOString(),
            active:true,
        },
    });

    const userAdmin = await prismaSQL.tbl_user.create({
        data: {
            email: "admin@falseserver.com",
            username: "AdminProfile",
            image_profile: "/SellerImage.jpg",
            password: "iH1lmYruPMEwtq7UqXQL6NbiH+hOciF7lGsYhAs8iDR173jSOd",
            first_name: "AdminFirstName",
            last_name: "AdminLastName",
            birth_day: "1999-02-26T00:00:00.000Z",
            token: "",
            refresh_token: "2024-07-24T00:00:00.000Z",
            last_logger: new Date().toISOString(),
            user_create: new Date().toISOString(),
            google_sign: true,
            last_update: new Date().toISOString(),
            id_rol: roles[2].id_rol,         
            active: true,
        },
    });

    const addressAdmin = await prismaSQL.tbl_address_user.createMany({
        data:
        {
            id_user: userAdmin.id_user,
            street: "43th avenue 23",
            city: "New york",
            state: "New york",
            country: "United States of America",
            zip_code: 10001,
            date_created: new Date().toISOString(),
            last_update: new Date().toISOString(),
            active: true,
        },
    });
}

async function createAmenities( prismaSQL ){
    const amenities = await prismaSQL.tbl_amenities.createMany({
        data:[
            {
                name: "Garden amenity",
                type_service: "GARDEN",
                active: true
            },
            {
                name: "Pool amenity",
                type_service: "POOL",
                active: true
            },
            {
                name: "Nature walk amenity",
                type_service: "NATURE_WALK",
                active: true
            },
            {
                name: "Free wifi",
                type_service: "FREE_WIFI",
                active: true
            },
            {
                name: "Mini bar",
                type_service: "MINI_BAR",
                active: true
            },
            {
                name: "Coffe maker",
                type_service: "COFFE_MAKER",
                active: true
            },
            {
                name: "In-Room safe",
                type_service: "IN_ROOM_SAFE",
                active: true
            },
            {
                name: "Tv cable",
                type_service: "TV_CABLE",
                active: true
            },
            {
                name: "Room service",
                type_service: "ROOM_SERVICE",
                active: true
            },
            {
                name: "Hairdryer",
                type_service: "HAIRDRYER",
                active: true
            },
            {
                name: "Spa",
                type_service: "SPA",
                active: true
            },
            {
                name: "Business center",
                type_service: "BUSINESS_CENTER",
                active: true
            },
            {
                name: "Laundry",
                type_service: "LAUNDRY",
                active: true
            },
            {
                name: "Pet friendly areas",
                type_service: "PET_FRIENDLY_AREAS",
                active: true
            },
            {
                name: "Wheelchair accessibility",
                type_service: "WHEELCHAIR_ACCESSIBILITY",
                active: true
            },
        ],
        skipDuplicates: true
    });
}