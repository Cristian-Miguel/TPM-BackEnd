const { PrismaClient } = require( '@prisma/client' );
const prisma = new PrismaClient();

async function main() {
    //Roles created
    const rolUser = await prisma.tbl_rol.create({
        data:{
            name:'USER',
            description:'User generic rol'
        }
    });

    const rolSeller = await prisma.tbl_rol.create({
        data:{
            name:'SELLER',
            description:'Seller rol to put the service'
        }
    });

    const rolAdmin = await prisma.tbl_rol.create({
        data:{
            name:'ADMINISTRATOR',
            description:'Adiministrator of the application'
        }
    });

    const userUser = await prisma.tbl_user.create({
        data: {
            email:"user@falseserver.com",
            username:"seller 1",
            image_profile:"/UserImage.jpg",
            password:"iH1lmYruPMEwtq7UqXQL6NbiH+hOciF7lGsYhAs8iDR173jSOd",
            first_name:"UserFirstName",
            last_name:"UserLastName",
            birth_day:"1999-04-26T00:00:00.000Z",
            token:"",
            refresh_token:"",
            last_logger:"2024-07-24T00:00:00.000Z",
            user_create:"2024-07-24T00:00:00.000Z",
            google_sign:true,
            last_update:"2024-07-24T00:00:00.000Z",
            id_rol:1,         
            active:true,
        },
    });

    const userSeller = await prisma.user.create({
        data: {
            email:"seller@falseserver.com",
            username:"seller 1",
            image_profile:"/SellerImage.jpg",
            password:"iH1lmYruPMEwtq7UqXQL6NbiH+hOciF7lGsYhAs8iDR173jSOd",
            first_name:"SellerFirstName",
            last_name:"SellerLastName",
            birth_day:"1999-05-21T00:00:00.000Z",
            token:"",
            refresh_token:"2024-07-24T00:00:00.000Z",
            last_logger:"2024-07-24T00:00:00.000Z",
            user_create:"2024-07-24T00:00:00.000Z",
            google_sign:true,
            last_update:"2024-07-24T00:00:00.000Z",
            id_rol:2,         
            active:true,
        },
    });

    const userAdmin = await prisma.user.create({
        data: {
            email:"seller@falseserver.com",
            username:"seller 1",
            image_profile:"/SellerImage.jpg",
            password:"iH1lmYruPMEwtq7UqXQL6NbiH+hOciF7lGsYhAs8iDR173jSOd",
            first_name:"AdminFirstName",
            last_name:"AdminLastName",
            birth_day:"1999-02-26T00:00:00.000Z",
            token:"",
            refresh_token:"2024-07-24T00:00:00.000Z",
            last_logger:"2024-07-24T00:00:00.000Z",
            user_create:"2024-07-24T00:00:00.000Z",
            google_sign:true,
            last_update:"2024-07-24T00:00:00.000Z",
            id_rol:3,         
            active:true,
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 