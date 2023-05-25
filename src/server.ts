import fastify from "fastify";
// import cors from "@fastify/cors";
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client"

dotenv.config();
const port: any = process.env.PORT;

const prisma = new PrismaClient();

const server = fastify();

// server.register(cors, {
//     //Opções
// })

server.get('/', (request, reply) => {
    return "Servidor on-line...";
});

interface UserAttrs {
    email: string,
    password: string,
}

server.post<{Body: UserAttrs }>('/user', async (request, reply) => {
    const {email, password} = request.body;

    const newUser = await prisma.user.create({
        data:{
            email,
            password,
        }
    });

    return reply.status(201).send(newUser);
});

server.listen ({port: 3000}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log(`Servidor rodando em ${address}`);
    }
});
